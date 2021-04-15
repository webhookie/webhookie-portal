import {Component, OnInit, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Trace, TraceStatus} from "../model/trace";
import {SimpleTableHeader, TableHeader} from "../common/generic-table/header/table-header";
import {EmptyTableHeader} from "../common/generic-table/header/empty-table-header";
import {SelectableTableHeader} from "../common/generic-table/header/selectable-table-header";
import {SortableTableHeader} from "../common/generic-table/header/sortable-table-header";
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

  get headers(): Array<TableHeader> {
    return [
      new EmptyTableHeader("sticky-cell", "Webhook_Header1"),
      new SelectableTableHeader("sticky-cell sticky-second-cell", "Webhook_Header2"),
      new SortableTableHeader("Trace Id", "traceId"),
      new SortableTableHeader("Webhook", "topic"),
      new SortableTableHeader("Authorized Subscribers", "consumerMessage.authorizedSubscribers"),
      new SortableTableHeader("Timestamp", "statusUpdate.time"),
      new SortableTableHeader("Status", "statusUpdate.status"),
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

  get detailHeaders(): Array<TableHeader> {
    return [
      new SimpleTableHeader("Span Id", "Webhook_Details_Span_Id_Header"),
      new SimpleTableHeader("Company", "Webhook_Details_Company_Header"),
      new SimpleTableHeader("Application", "Webhook_Details_Application_Header"),
      new SimpleTableHeader("Callback URL", "Webhook_Details_Callback_Header"),
      new SimpleTableHeader("Timestamp", "Webhook_Details_Timestamp_Header"),
      new SimpleTableHeader("Response code", "Webhook_Details_Response_Code_Header"),
      new SimpleTableHeader("Status", "Webhook_Details_Status_Header"),
      new SimpleTableHeader("Tries", "Webhook_Details_Tries_Header"),
      new SimpleTableHeader("", "Webhook_Details_Header1")
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
