import { Injectable } from '@angular/core';
import {Adapter} from "./adapter";
import {Application, CallbackDetails, CallbackSecurity, StatusUpdate, Subscription} from "../model/subscription";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionAdapter implements Adapter<Subscription>{

  constructor() { }

  adapt(item: any): Subscription {
    let ia = item.application;
    let application = new Application(
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