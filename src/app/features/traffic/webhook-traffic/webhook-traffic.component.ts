import {Component, OnInit, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Trace} from "../model/trace";
import {SimpleTrafficTableHeader, TrafficTableHeader} from "../common/traffic-table/header/traffic-table-header";
import {EmptyTrafficHeader} from "../common/traffic-table/header/empty-traffic-header";
import {SelectableTrafficHeader} from "../common/traffic-table/header/selectable-traffic-header";
import {SortableTrafficHeader} from "../common/traffic-table/header/sortable-traffic-header";
import {TrafficTableFilter} from "../common/traffic-table/filter/traffic-table-filter";
import {EmptyTrafficFilter} from "../common/traffic-table/filter/empty-traffic-filter";
import {SearchTrafficFilter} from "../common/traffic-table/filter/search-traffic-filter";
import {TimestampTrafficFilter} from "../common/traffic-table/filter/timestamp-traffic-filter";
import {TrafficTableComponent} from "../common/traffic-table/traffic-table.component";
import {TrafficTableColumn} from "../common/traffic-table/column/traffic-table-column";
import {
  StatusColumn,
  SubscribersColumn,
  TimestampColumn,
  TraceIdColumn,
  TraceMoreDataColumn,
  WebhookColumn
} from "./traffic-columns";
import {SelectableTrafficColumn} from "../common/traffic-table/column/selectable-traffic-column";
import {TrafficTable} from "../common/traffic-table/traffic-table";
import {Span} from "../model/span";
import {
  ApplicationColumn,
  CallbackColumn,
  EntityColumn,
  ResponseCodeColumn,
  SpanIdColumn,
  TriesColumn
} from "../subscription-traffic/span-columns";
import {WebhookTrafficFilter} from "../service/webhook-traffic-filter";
import {TableSort} from "../common/traffic-table/filter/table-sort";
import {SearchListTrafficFilter} from "../common/traffic-table/filter/search-list-traffic-filter";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent extends TrafficTable<Trace, Span> implements OnInit {
  // @ts-ignore
  @ViewChild("trafficTableComponent") trafficTableComponent: TrafficTableComponent;

  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();
  readonly tableData: Observable<Array<Trace>> = this._traces$.asObservable();

  constructor(
    private readonly traceService: TraceService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  fetchData(filters: WebhookTrafficFilter, sort?: TableSort) {
    this.traceService.readTraces(filters, sort)
      .subscribe(it => {
        this._traces$.next(it)
      })
  }

  get headers(): Array<TrafficTableHeader> {
    return [
      new EmptyTrafficHeader("sticky-cell", "Webhook_Header1"),
      new SelectableTrafficHeader("sticky-cell sticky-second-cell", "Webhook_Header2"),
      new SortableTrafficHeader("Trace Id", "traceId"),
      new SortableTrafficHeader("Webhook", "topic"),
      new SortableTrafficHeader("Authorized Subscribers", "consumerMessage.authorizedSubscribers"),
      new SortableTrafficHeader("Timestamp", "statusUpdate.time"),
      new SortableTrafficHeader("Status", "statusUpdate.status"),
    ]
  }

  get filters(): Array<TrafficTableFilter> {
    return [
      new EmptyTrafficFilter("sticky-cell bg-light-gray", "Webhook_Filter1", ""),
      new EmptyTrafficFilter("sticky-second-cell sticky-cell bg-light-gray", "Webhook_Filter2", ""),
      new SearchTrafficFilter("", "traceId", "Trace Id"),
      new SearchTrafficFilter("", "topic", "Webhook"),
      new SearchTrafficFilter("", "authorizedSubscribers", "Authorized Subscribers"),
      new TimestampTrafficFilter("", "timestamp", "Timestamp"),
      new SearchListTrafficFilter("", "status", "Status"),
      new EmptyTrafficFilter("", "Webhook_Filter2", ""),
    ]
  }

  get columns(): Array<TrafficTableColumn> {
    return [
      new TraceMoreDataColumn("text-center sticky-cell", "Webhook_More_Column"),
      new SelectableTrafficColumn("sticky-cell sticky-second-cell", "Webhook_Select_Column"),
      new TraceIdColumn("Webhook_TraceId_Column"),
      new WebhookColumn("Webhook_Topic_Column"),
      new SubscribersColumn("Webhook_Auth_Subscribers_Column"),
      new TimestampColumn("Webhook_Timestamp_Column"),
      new StatusColumn("Webhook_Status_Column"),
    ];
  }

  get detailHeaders(): Array<TrafficTableHeader> {
    return [
      new SimpleTrafficTableHeader("Span Id", "Webhook_Details_Span_Id_Header"),
      new SimpleTrafficTableHeader("Company", "Webhook_Details_Company_Header"),
      new SimpleTrafficTableHeader("Application", "Webhook_Details_Application_Header"),
      new SimpleTrafficTableHeader("Callback URL", "Webhook_Details_Callback_Header"),
      new SimpleTrafficTableHeader("Timestamp", "Webhook_Details_Timestamp_Header"),
      new SimpleTrafficTableHeader("Response code", "Webhook_Details_Response_Code_Header"),
      new SimpleTrafficTableHeader("Status", "Webhook_Details_Status_Header"),
      new SimpleTrafficTableHeader("Tries", "Webhook_Details_Tries_Header"),
      new SimpleTrafficTableHeader("", "Webhook_Details_Header1")
    ]
  }

  get detailColumns(): Array<TrafficTableColumn> {
    return [
      new SpanIdColumn("Webhook_Span_SpanId_Column"),
      new EntityColumn("Webhook_Span_Entity_Column"),
      new ApplicationColumn("Webhook_Span_Application_Column"),
      new CallbackColumn("Webhook_Span_Callback_Column"),
      new TimestampColumn("Webhook_Span_Timestamp_Column"),
      new ResponseCodeColumn("Webhook_Span_ResponseCode_Column"),
      new StatusColumn("Webhook_Span_Status_Column"),
      new TriesColumn("Webhook_Span_Tries_Column"),
    ]
  }

  loadDetails(data: Trace) {
    data.loading();
    this.traceService.readTraceSpans(data.traceId)
      .subscribe(it => data.update(it))
  }
}
