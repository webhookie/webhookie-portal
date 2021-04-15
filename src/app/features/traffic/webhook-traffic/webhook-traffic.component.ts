import {Component, OnInit, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Trace, TraceStatus} from "../model/trace";
import {SimpleTrafficTableHeader, TrafficTableHeader} from "../common/generic-table/header/traffic-table-header";
import {EmptyTrafficHeader} from "../common/generic-table/header/empty-traffic-header";
import {SelectableTrafficHeader} from "../common/generic-table/header/selectable-traffic-header";
import {SortableTrafficHeader} from "../common/generic-table/header/sortable-traffic-header";
import {TableFilter} from "../common/generic-table/filter/table-filter";
import {EmptyTableFilter} from "../common/generic-table/filter/empty-table-filter";
import {SearchTableFilter} from "../common/generic-table/filter/search-table-filter";
import {TimestampTableFilter} from "../common/generic-table/filter/timestamp-table-filter";
import {GenericTableComponent} from "../common/generic-table/generic-table.component";
import {TableColumn} from "../common/generic-table/column/table-column";
import {
  StatusColumn,
  SubscribersColumn,
  TimestampColumn,
  TraceIdColumn,
  TraceMoreDataColumn,
  WebhookColumn
} from "./traffic-columns";
import {SelectableTableColumn} from "../common/generic-table/column/selectable-table-column";
import {GenericTable} from "../common/generic-table/generic-table";
import {Span} from "../model/span";
import {
  ApplicationColumn,
  CallbackColumn,
  EntityColumn,
  ResponseCodeColumn,
  SpanIdColumn,
  TriesColumn
} from "../subscription-traffic/span-columns";
import {SearchListTableFilter} from "../common/generic-table/filter/search-list-table-filter";
import {Pageable} from "../../../shared/request/pageable";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent extends GenericTable<Trace, Span> implements OnInit {
  // @ts-ignore
  @ViewChild("tableComponent") tableComponent: GenericTableComponent;

  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();
  readonly tableData: Observable<Array<Trace>> = this._traces$.asObservable();

  constructor(
    private readonly traceService: TraceService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  fetchData(filter: any, pageable: Pageable) {
    this.traceService.readTraces(filter, pageable)
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

  get filters(): Array<TableFilter> {
    return [
      new EmptyTableFilter("sticky-cell bg-light-gray", "Webhook_Filter1", ""),
      new EmptyTableFilter("sticky-second-cell sticky-cell bg-light-gray", "Webhook_Filter2", ""),
      new SearchTableFilter("", "traceId", "Trace Id"),
      new SearchTableFilter("", "topic", "Webhook"),
      new SearchTableFilter("", "authorizedSubscribers", "Authorized Subscribers"),
      new TimestampTableFilter("", "timestamp", "Timestamp"),
      new SearchListTableFilter("", "status", "Status", TraceStatus),
      new EmptyTableFilter("", "Webhook_Filter2", ""),
    ]
  }

  get columns(): Array<TableColumn> {
    return [
      new TraceMoreDataColumn("text-center sticky-cell", "Webhook_More_Column"),
      new SelectableTableColumn("sticky-cell sticky-second-cell", "Webhook_Select_Column"),
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

  get detailColumns(): Array<TableColumn> {
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
