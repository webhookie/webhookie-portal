import { Injectable } from '@angular/core';
import {Subscription} from "../../../shared/model/subscription";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionContextMenuService {

  constructor() { }

  // noinspection JSUnusedLocalSymbols
  canViewTraffic(subscription: Subscription): boolean {
    return true;
  }

  canSuspend(subscription: Subscription): boolean {
    return true;
  }

  canUnsuspend(subscription: Subscription): boolean {
    return true;
  }
}
