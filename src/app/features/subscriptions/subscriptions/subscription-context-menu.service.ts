/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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

  isConsumerSubscriptions(role$: BehaviorSubject<string>): boolean {
    return role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER;
  }

  isProviderSubscriptions(role$: BehaviorSubject<string>): boolean {
    return role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER;
  }

  canViewTraffic(): (subscription: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.ACTIVATED, SubscriptionStatus.DEACTIVATED, SubscriptionStatus.BLOCKED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status);
  }

  canActivate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.VALIDATED, SubscriptionStatus.DEACTIVATED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerSubscriptions(role$);
  }

  canValidate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.DRAFT, SubscriptionStatus.BLOCKED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerSubscriptions(role$);
  }

  canWrite(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    return () => this.context.hasConsumerRole
      && this.isConsumerSubscriptions(role$);
  }

  canDelete(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    let canWrite: (data: Subscription) => boolean = this.canWrite(role$)
    return (it) => canWrite(it)
      && it.statusUpdate.status != SubscriptionStatus.ACTIVATED
      && this.isConsumerSubscriptions(role$);
  }

  canEdit(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    let validStatusList = [
      SubscriptionStatus.DRAFT,
      SubscriptionStatus.VALIDATED,
      SubscriptionStatus.READY_TO_SUBMIT
    ]
    let canWrite: (data: Subscription) => boolean = this.canWrite(role$)
    return (it) => canWrite(it)
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerSubscriptions(role$);
  }

  canDeactivate(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.ACTIVATED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerSubscriptions(role$);
  }

  canSuspend(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    return (it) => this.context.hasProviderRole
      && it.statusUpdate.status != SubscriptionStatus.SUSPENDED
      && this.isProviderSubscriptions(role$);
  }

  canViewSubmitRequest(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    return this.canApprove(role$)
  }

  canApprove(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    return (it) => this.context.hasProviderRole
      && it.statusUpdate.status == SubscriptionStatus.SUBMITTED
      && this.isProviderSubscriptions(role$);
  }

  canReject(role$: BehaviorSubject<string>): (subscription: Subscription) => boolean {
    return (it) => this.context.hasProviderRole
      && it.statusUpdate.status == SubscriptionStatus.SUBMITTED
      && this.isProviderSubscriptions(role$);
  }

  canUnsuspend(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.SUSPENDED]
    return (it) => this.context.hasProviderRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isProviderSubscriptions(role$);
  }

  canUnblock(role$: BehaviorSubject<string>): (it: Subscription) => boolean {
    let validStatusList = [SubscriptionStatus.BLOCKED]
    return (it) => this.context.hasConsumerRole
      && validStatusList.includes(it.statusUpdate.status)
      && this.isConsumerSubscriptions(role$);
  }
}
