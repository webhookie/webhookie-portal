import {Component, OnInit, ViewChild} from '@angular/core';
import {SpanService} from "../service/span.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Span, SpanStatus} from "../model/span";
import {TrafficTableHeader} from "../common/generic-table/header/traffic-table-header";
import {SelectableTrafficHeader} from "../common/generic-table/header/selectable-traffic-header";
import {SortableTrafficHeader} from "../common/generic-table/header/sortable-traffic-header";
import {TableFilter} from "../common/generic-table/filter/table-filter";
import {SearchTableFilter} from "../common/generic-table/filter/search-table-filter";
import {SearchListTableFilter} from "../common/generic-table/filter/search-list-table-filter";
import {TimestampTableFilter} from "../common/generic-table/filter/timestamp-table-filter";
import {EmptyTableFilter} from "../common/generic-table/filter/empty-table-filter";
import {GenericTableComponent} from "../common/generic-table/generic-table.component";
import {TableColumn} from "../common/generic-table/column/table-column";
import {SelectableTableColumn} from "../common/generic-table/column/selectable-table-column";
import {
  ApplicationColumn,
  CallbackColumn,
  ResponseCodeColumn,
  SpanIdColumn,
  StatusColumn,
  TimestampColumn,
  TraceIdColumn,
  TriesColumn,
  WebhookColumn
} from "./span-columns";
import {GenericTable} from "../common/generic-table/generic-table";
import {Pageable} from "../../../shared/request/pageable";

@Component({
  selector: 'app-subscription-traffic',
  templateUrl: './subscription-traffic.component.html',
  styleUrls: ['./subscription-traffic.component.css']
})
export class SubscriptionTrafficComponent extends GenericTable<Span, Span> implements OnInit {
  private readonly _spans$: Subject<Array<Span>> = new ReplaySubject();
  // @ts-ignore
  @ViewChild("tableComponent") tableComponent: GenericTableComponent;

  readonly tableData: Observable<Array<Span>> = this._spans$.asObservable();

  constructor(
    private readonly spanService: SpanService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  fetchData(filter: any, pageable: Pageable) {
    this.spanService.readSpans(filter, pageable)
      .subscribe(it => this._spans$.next(it));
  }

  get headers(): Array<TrafficTableHeader> {
    return [
      new SelectableTrafficHeader("sticky-cell", "Subscription_Select_Header"),
      new SortableTrafficHeader("Trace Id", "traceId"),
      new SortableTrafficHeader("Application", "subscription.application.name"),
      new SortableTrafficHeader("Webhook", "subscription.topic"),
      new SortableTrafficHeader("Callback URL", "subscription.callback.url"),
      new SortableTrafficHeader("Timestamp", "lastStatus.time"),
      new SortableTrafficHeader("Span Id", "spanId"),
      new SortableTrafficHeader("Response Code", "latestResult.statusCode"),
      new SortableTrafficHeader("Status", "lastStatus.status"),
      new SortableTrafficHeader("Tries", "retryHistory.length"),
    ]
  }

  get filters(): Array<TableFilter> {
    return [
      new EmptyTableFilter("sticky-cell bg-light-gray", "Subscription_Filter1",""),
      new SearchTableFilter("", "traceId", "Trace Id"),
      new SearchTableFilter("", "application", "Application"),
      new SearchTableFilter("", "topic", "Webhook"),
      new SearchTableFilter("", "callback", "Callback Url"),
      new TimestampTableFilter("", "timestamp", "Timestamp"),
      new SearchTableFilter("", "spanId", "Span Id"),
      new SearchTableFilter("", "responseCode", "Response Code"),
      new SearchListTableFilter("", "status", "Status", SpanStatus),
      new EmptyTableFilter("", "Subscription_Filter2", ""),
      new EmptyTableFilter("", "Subscription_Filter3", ""),
    ]
  }

  get columns(): Array<TableColumn> {
    return [
      new SelectableTableColumn("sticky-cell", "Subscription_Select_Column"),
      new TraceIdColumn("Subscription_TraceId_Column"),
      new ApplicationColumn("Subscription_Application_Column"),
      new WebhookColumn("Subscription_Webhook_Column"),
      new CallbackColumn("Subscription_Callback_Column"),
      new TimestampColumn("Subscription_Timestamp_Column"),
      new SpanIdColumn("Subscription_SpanId_Column"),
      new ResponseCodeColumn("Subscription_ResponseCode_Column"),
      new StatusColumn("Subscription_Status_Column"),
      new TriesColumn("Subscription_Tries_Column"),
    ]
  }

  loadDetails(data: any) {
  }

  detailHeaders?: TrafficTableHeader[];
  detailColumns?: TableColumn[];
}
