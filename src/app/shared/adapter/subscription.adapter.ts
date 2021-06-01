import {Injectable} from '@angular/core';
import {BaseAdapter} from "./adapter";
import {ApplicationDetails, StatusUpdate, Subscription} from "../model/subscription";
import {CallbackSecurity} from "../model/callback-security";
import {DateUtils} from "../date-utils";
import {Callback} from "../model/callback";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionAdapter extends BaseAdapter<Subscription> {
  private static security(callback: any): CallbackSecurity | null {
    let s = callback.security;
    if (s) {
      return new CallbackSecurity(s.method, s.keyId);
    }

    return null;
  }

  adapt(item: any): Subscription {
    let ia = item.application;
    let application = new ApplicationDetails(
      ia.id,
      ia.name,
      ia.entity
    );

    let ic = item.callback;

    let callback = new Callback(
      ic.id,
      ic.name,
      ic.httpMethod,
      ic.url,
      ic.signable,
      SubscriptionAdapter.security(ic)
    )

    let su = item.statusUpdate;
    let statusUpdate = new StatusUpdate(
      su.status,
      su.reason,
      DateUtils.toLocalDate(su.time)
    );

    return new Subscription(
      item.id,
      application,
      callback,
      statusUpdate,
      item.topic,
      item.bklocked
    );
  }
}
