/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "../../../shared/model/subscription";
import {SubscriptionService} from "../../../shared/service/subscription.service";
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {GenericTableComponent} from "../../../shared/components/generic-table/generic-table.component";
import {Pageable} from "../../../shared/request/pageable";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {SortableTableHeader} from "../../../shared/model/table/header/sortable-table-header";
import {
  SubscriptionApplicationColumn,
  SubscriptionCallbackColumn,
  SubscriptionEntityColumn,
  SubscriptionStatusColumn,
  SubscriptionWebhookColumn
} from "./subscription-columns";
import {ContextMenuTableColumn} from "../../../shared/model/table/column/context-menu-table-column";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../shared/model/table/column/context-menu-item";
import {SubscriptionContextMenuService} from "./subscription-context-menu.service";
import {Constants} from "../../../shared/constants";
import {RouterService} from "../../../shared/service/router.service";
import {WebhooksContext} from "../../webhooks/webhooks-context";
import {WebhookApiService} from "../../webhooks/service/webhook-api.service";
import {SubscriptionContext} from "../../webhooks/subscribe-webhook/subscription-context";
import {Webhook} from "../../webhooks/model/webhook";
import {WebhookSelection} from "../../webhooks/model/webhook-selection";

type SubscriptionContextMenu = ContextMenuItem<Subscription, SubscriptionMenu>;

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent extends GenericTable<Subscription, Subscription> implements OnInit {
  // @ts-ignore
  @ViewChild("tableComponent") tableComponent: GenericTableComponent;

  readonly _subscriptions$: Subject<Array<Subscription>> = new ReplaySubject();
  readonly tableData: Observable<Array<Subscription>> = this._subscriptions$.asObservable();
  readonly _role$: BehaviorSubject<string> = new BehaviorSubject(Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER);

  constructor(
    private readonly webhookApiService: WebhookApiService,
    private readonly context: WebhooksContext,
    private readonly subscriptionContext: SubscriptionContext,
    private readonly routeService: RouterService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly contextMenuService: SubscriptionContextMenuService,
    private readonly route: ActivatedRoute,
    private readonly service: SubscriptionService
  ) {
    super();

    this.activatedRoute.queryParams
      .subscribe(it => this.initialFilters = it);
  }

  fetchData(filter: any, pageable: Pageable) {
    let queryFilter = {};
    Object.assign(queryFilter, filter);
    // @ts-ignore
    queryFilter["role"] = this._role$.value;
    this.service.fetchSubscriptions(queryFilter, pageable)
      .subscribe(it => this._subscriptions$.next(it));
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(it => this._role$.next(it.role))
    // .pipe(map(it => it.role))
    // .pipe(mergeMap( it => this.service.fetchSubscriptions(it)))
    // .subscribe( it => this._subscriptions$.next(it));
  }

  get headers(): Array<TableHeader> {
    let headers = [
      new SortableTableHeader("Application", "application.name"),
      new SortableTableHeader("Webhook", "topic"),
      new SortableTableHeader("Callback URL", "callback.url"),
      new SortableTableHeader("Status", "statusUpdate.status"),
    ];
    if(this._role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER) {
      let companyHeader = new SortableTableHeader("Company", "application.entity")
      return [companyHeader].concat(headers)
    } else {
      return headers
    }
  }

  get filters(): Array<TableFilter> {
    return []
  }

  get columns(): Array<TableColumn> {
    let columns = [
      new SubscriptionApplicationColumn("Subscription_Application"),
      new SubscriptionWebhookColumn("Subscription_Topic"),
      new SubscriptionCallbackColumn("Subscription_Callback"),
      new SubscriptionStatusColumn("Subscription_Status"),
      new ContextMenuTableColumn(this.createContextMenuItems())
    ];
    if(this._role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER) {
      let companyColumn = new SubscriptionEntityColumn("Subscription_Entity")
      return [companyColumn].concat(columns)
    } else {
      return columns
    }
  }


  private createContextMenuItems(): Array<SubscriptionContextMenu> {
    return [
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.VIEW_TRAFFIC)
        .handler(this.viewTraffic())
        .isAvailable(this.contextMenuService.canViewTraffic())
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.ACTIVATE)
        .handler(this.activate())
        .isAvailable(this.contextMenuService.canActivate(this._role$))
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.DEACTIVATE)
        .handler(this.deactivate())
        .isAvailable(this.contextMenuService.canDeactivate(this._role$))
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.VALIDATE)
        .handler(this.edit())
        .isAvailable(this.contextMenuService.canValidate(this._role$))
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.EDIT)
        .handler(this.edit())
        .isAvailable(this.contextMenuService.canWrite(this._role$))
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.DELETE)
        .handler(this.delete())
        .isAvailable(this.contextMenuService.canDelete(this._role$))
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.SUSPEND)
        .handler(this.suspend())
        .isAvailable(this.contextMenuService.canSuspend(this._role$))
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.UNSUSPEND)
        .handler(this.unsuspend())
        .isAvailable(this.contextMenuService.canUnsuspend(this._role$))
        .build(),
      ContextMenuItemBuilder
        .create<Subscription, SubscriptionMenu>(SubscriptionMenu.UNBLOCK)
        .handler(this.unblock())
        .isAvailable(this.contextMenuService.canUnblock(this._role$))
        .build(),
    ]
  }

  viewTraffic(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription: Subscription) => {
      const params = {
        subscriptionId: subscription.id
      }
      if(this._role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER) {
        this.routeService
          .navigateTo("/traffic/subscription", params)
      }
      if(this._role$.value == Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER) {
        this.routeService
          .navigateTo("/traffic/webhook", params)
      }
    }
  }

  activate() {
    return (subscription: Subscription) => {
      this.service.activateSubscription(subscription)
        .subscribe(it => subscription.statusUpdate = it.statusUpdate);
    }
  }

  edit(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription: Subscription) => {
      this.webhookApiService.fetchByTopic(subscription.topic)
        .subscribe(group => {
          this.context.selectWebhook(WebhookSelection.createByTopic(group, subscription.topic));
          this.subscriptionContext.selectSubscription(subscription);
          const params = {
            subscriptionId: subscription.id
          }
          this.routeService
            .navigateTo("webhooks/subscribe-webhook", params)
        })
    }
  }

  delete(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription: Subscription) => {
      this.service.delete(subscription)
        .subscribe(it => this.tableComponent.delete(it));
    }
  }

  deactivate(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription) => {
      this.service.deactivateSubscription(subscription)
        .subscribe(it => subscription.statusUpdate = it.statusUpdate);
    }
  }

  suspend(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription) => {
      this.service.suspendSubscription(subscription)
        .subscribe(it => subscription.statusUpdate = it.statusUpdate);
    }
  }

  unsuspend(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription) => {
      this.service.unsuspendSubscription(subscription)
        .subscribe(it => subscription.statusUpdate = it.statusUpdate);
    }
  }

  unblock(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription) => {
      this.service.unblockSubscription(subscription.id)
        .subscribe(it => subscription.statusUpdate = it.statusUpdate);
    }
  }

  fetchDetails(data: any): Observable<boolean> {
    return of(true);
  }

  detailHeaders?: TableHeader[];
  detailColumns?: TableColumn[];
}

enum SubscriptionMenu {
  VIEW_TRAFFIC = "View Traffic",
  ACTIVATE = "Activate",
  DEACTIVATE = "Deactivate",
  VALIDATE = "Validate",
  EDIT = "Edit",
  DELETE = "Delete",
  SUSPEND = "Suspend",
  UNSUSPEND = "Unsuspend",
  UNBLOCK = "Unblock"
}

