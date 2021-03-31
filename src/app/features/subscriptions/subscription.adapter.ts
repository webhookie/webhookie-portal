import { Injectable } from '@angular/core';
import {Adapter} from "../../shared/adapter/adapter";
import {ApplicationDetails, CallbackDetails, StatusUpdate, Subscription} from "./subscription";
import {CallbackSecurity} from "../../shared/model/callback-security";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionAdapter implements Adapter<Subscription>{

  constructor() { }

  adapt(item: any): Subscription {
    let ia = item.application;
    let application = new ApplicationDetails(
      ia.id,
      ia.name,
      ia.entity
    );

    let ic = item.callback;

    let callback = new CallbackDetails(
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
      su.time
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

  private static security(callback: any): CallbackSecurity | null {
    let s = callback.security;
    if(s) {
      return new CallbackSecurity(s.method, s.keyId);
    }

    return null;
  }
}
