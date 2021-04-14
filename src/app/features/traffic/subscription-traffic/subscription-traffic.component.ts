import {Component, OnInit, ViewChild} from '@angular/core';
import {SpanService} from "../service/span.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Span, SpanStatus} from "../model/span";
import {TrafficTableHeader} from "../common/traffic-table/header/traffic-table-header";
import {SelectableTrafficHeader} from "../common/traffic-table/header/selectable-traffic-header";
import {SortableTrafficHeader} from "../common/traffic-table/header/sortable-traffic-header";
import {TrafficTableFilter} from "../common/traffic-table/filter/traffic-table-filter";
import {SearchTrafficFilter} from "../common/traffic-table/filter/search-traffic-filter";
import {SearchListTrafficFilter} from "../common/traffic-table/filter/search-list-traffic-filter";
import {TimestampTrafficFilter} from "../common/traffic-table/filter/timestamp-traffic-filter";
import {EmptyTrafficFilter} from "../common/traffic-table/filter/empty-traffic-filter";
import {TrafficTableComponent} from "../common/traffic-table/traffic-table.component";
import {TrafficTableColumn} from "../common/traffic-table/column/traffic-table-column";
import {SelectableTrafficColumn} from "../common/traffic-table/column/selectable-traffic-column";
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
import {TrafficTable} from "../common/traffic-table/traffic-table";
import {SubscriptionTrafficFilter} from "../service/subscription-traffic-filter";
import {TableSort} from "../common/traffic-table/filter/table-sort";

@Component({
  selector: 'app-subscription-traffic',
  templateUrl: './subscription-traffic.component.html',
  styleUrls: ['./subscription-traffic.component.css']
})
export class SubscriptionTrafficComponent extends TrafficTable<Span, Span> implements OnInit {
  private readonly _spans$: Subject<Array<Span>> = new ReplaySubject();
  // @ts-ignore
  @ViewChild("trafficTableComponent") trafficTableComponent: TrafficTableComponent;

  readonly tableData: Observable<Array<Span>> = this._spans$.asObservable();

  constructor(
    private readonly spanService: SpanService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  fetchData(filters: SubscriptionTrafficFilter, sort?: TableSort) {
    this.spanService.readSpans(filters, sort)
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

  get filters(): Array<TrafficTableFilter> {
    return [
      new EmptyTrafficFilter("sticky-cell bg-light-gray", "Subscription_Filter1",""),
      new SearchTrafficFilter("", "traceId", "Trace Id"),
      new SearchTrafficFilter("", "application", "Application"),
      new SearchTrafficFilter("", "topic", "Webhook"),
      new SearchTrafficFilter("", "callback", "Callback Url"),
      new TimestampTrafficFilter("", "timestamp", "Timestamp"),
      new SearchTrafficFilter("", "spanId", "Span Id"),
      new SearchTrafficFilter("", "responseCode", "Response Code"),
      new SearchListTrafficFilter("", "status", "Status", SpanStatus),
      new EmptyTrafficFilter("", "Subscription_Filter2", ""),
      new EmptyTrafficFilter("", "Subscription_Filter3", ""),
    ]
  }

  get columns(): Array<TrafficTableColumn> {
    return [
      new SelectableTrafficColumn("sticky-cell", "Subscription_Select_Column"),
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
  detailColumns?: TrafficTableColumn[];
}
