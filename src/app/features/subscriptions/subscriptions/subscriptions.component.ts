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
import {SelectableTableHeader} from "../../../shared/model/table/header/selectable-table-header";
import {
  SubscriptionApplicationColumn,
  SubscriptionCallbackColumn,
  SubscriptionEntityColumn,
  SubscriptionStatusColumn,
  SubscriptionWebhookColumn
} from "./subscription-columns";
import {SelectableTableColumn} from "../../../shared/model/table/column/selectable-table-column";
import {ContextMenuTableColumn} from "../../../shared/model/table/column/context-menu-table-column";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../shared/model/table/column/context-menu-item";
import {SubscriptionContextMenuService} from "./subscription-context-menu.service";
import {Constants} from "../../../shared/constants";
import {RouterService} from "../../../shared/service/router.service";
import {WebhooksContext} from "../../webhooks/webhooks-context";
import {WebhookGroupService} from "../../webhooks/service/webhook-group.service";
import {WebhookGroupElement} from "../../webhooks/webhook-page/sidebar/sidebar-list/webhook-group-element";

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
    private readonly webhookGroupService: WebhookGroupService,
    private readonly context: WebhooksContext,
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
    return [
      new SelectableTableHeader("sticky-cell", "Subscription_Select_Header"),
      new SortableTableHeader("Company", "application.entity"),
      new SortableTableHeader("Application", "application.name"),
      new SortableTableHeader("Webhook", "topic"),
      new SortableTableHeader("Callback URL", "callback.url"),
      new SortableTableHeader("Status", "statusUpdate.status", "text-center"),
    ]
  }

  get filters(): Array<TableFilter> {
    return []
  }

  get columns(): Array<TableColumn> {
    return [
      new SelectableTableColumn("sticky-cell", "Subscription_Select_Column"),
      new SubscriptionEntityColumn("Subscription_Entity"),
      new SubscriptionApplicationColumn("Subscription_Application"),
      new SubscriptionWebhookColumn("Subscription_Topic"),
      new SubscriptionCallbackColumn("Subscription_Callback"),
      new SubscriptionStatusColumn("Subscription_Status"),
      new ContextMenuTableColumn(this.createContextMenuItems())
    ]
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
        .handler(this.validate())
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
        .isAvailable(this.contextMenuService.canWrite(this._role$))
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
    return (it: Subscription, item: SubscriptionContextMenu) => {
      console.warn(`${item} ==> ${it.id}`);
    }
  }

  activate() {
    return (subscription: Subscription) => {
      this.service.activateSubscription(subscription)
        .subscribe(it => subscription.statusUpdate = it.statusUpdate);
    }
  }

  validate(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (subscription: Subscription) => {
      this.webhookGroupService.fetchByTopic(subscription.topic)
        .subscribe(group => {
          let element = WebhookGroupElement.create(group);
          let topic = group.topics.filter(it => it.name == subscription.topic)[0];
          this.context.selectTopic(element, topic);
          this.context.selectSubscription(subscription);
          const params = {
            subscriptionId: subscription.id
          }
          this.routeService
            .navigateTo("webhooks/subscribe-webhook", params)
        })
    }
  }

  edit(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (it: Subscription, item: SubscriptionContextMenu) => {
      console.warn(`${item.item} ==> ${it.id}`);
    }
  }

  delete(): (subscription: Subscription, item: SubscriptionContextMenu) => any {
    return (it: Subscription, item: SubscriptionContextMenu) => {
      console.warn(`${item.item} ==> ${it.id}`);
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
      this.service.unblockSubscription(subscription)
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

