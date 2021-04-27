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

  canViewTraffic(): (subscription: Subscription) => boolean {
    return () => true;
  }

  canActivate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    return (it) => this.context.hasConsumerRole &&
      (it.statusUpdate.status == SubscriptionStatus.VALIDATED) &&
      (role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER);
  }

  canDeactivate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    return (it) => this.context.hasConsumerRole &&
      (it.statusUpdate.status != SubscriptionStatus.SUSPENDED) &&
      (role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER);
  }

  canSuspend(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    return () => this.context.hasProviderRole && role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER ;
  }

  canUnsuspend(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    return (it) => this.context.hasProviderRole &&
      (it.statusUpdate.status == SubscriptionStatus.SUSPENDED) &&
      (role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER);
  }
}
