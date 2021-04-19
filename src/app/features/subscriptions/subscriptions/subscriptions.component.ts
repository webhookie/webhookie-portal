import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "../../../shared/model/subscription";
import {SubscriptionService} from "../../../shared/subscription.service";
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {GenericTableComponent} from "../../../shared/components/generic-table/generic-table.component";
import {Pageable} from "../../../shared/request/pageable";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {SortableTableHeader} from "../../../shared/model/table/header/sortable-table-header";
import {SelectableTableHeader} from "../../../shared/model/table/header/selectable-table-header";
import {
  SubscriptionApplicationColumn, SubscriptionCallbackColumn,
  SubscriptionEntityColumn, SubscriptionStatusColumn,
  SubscriptionWebhookColumn
} from "./subscription-columns";
import {SelectableTableColumn} from "../../../shared/model/table/column/selectable-table-column";

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
  readonly _role$: BehaviorSubject<string> = new BehaviorSubject("CONSUMER");

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: SubscriptionService
  ) {
    super();
  }

  fetchData(filter: any, pageable: Pageable) {
    filter["role"] = this._role$.value;
    this.service.fetchSubscriptions(filter, pageable)
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
      new SortableTableHeader("Status", "statusUpdate.status"),
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
    ]
  }

  fetchDetails(data: any) {
  }

  detailHeaders?: TableHeader[];
  detailColumns?: TableColumn[];
}
