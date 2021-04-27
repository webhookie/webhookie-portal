import {Injectable} from '@angular/core';
import {Subscription, SubscriptionStatus} from "../../../shared/model/subscription";
import {ApplicationContext} from "../../../shared/application.context";
import {BehaviorSubject} from "rxjs";
import {Constants} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionContextMenuService {

  constructor(
    private readonly context: ApplicationContext
  ) {
  }

  isConsumerTraffic(role$: BehaviorSubject<string>): boolean {
    return role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER;
  }

  isProviderTraffic(role$: BehaviorSubject<string>): boolean {
    return role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER;
  }

  canViewTraffic(): (subscription: Subscription) => boolean {
    return () => true;
  }

  canActivate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.VALIDATED, SubscriptionStatus.DEACTIVATED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerTraffic(role$);
  }

  canValidate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.SAVED, SubscriptionStatus.BLOCKED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerTraffic(role$);
  }

  canWrite(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    return (it) => this.context.hasConsumerRole
      && this.isConsumerTraffic(role$);
  }

  canDeactivate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.ACTIVATED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerTraffic(role$);
  }

  canSuspend(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    return () => this.context.hasProviderRole
      && this.isProviderTraffic(role$);
  }

  canUnsuspend(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.SUSPENDED]
    return (it) => this.context.hasProviderRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isProviderTraffic(role$);
  }
}
