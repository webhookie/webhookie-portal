import {Component, OnInit, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {Trace, TraceStatus} from "../model/trace";
import {SimpleTableHeader, TableHeader} from "../../../shared/model/table/header/table-header";
import {EmptyTableHeader} from "../../../shared/model/table/header/empty-table-header";
import {SelectableTableHeader} from "../../../shared/model/table/header/selectable-table-header";
import {SortableTableHeader} from "../../../shared/model/table/header/sortable-table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {EmptyTableFilter} from "../../../shared/model/table/filter/empty-table-filter";
import {SearchTableFilter} from "../../../shared/model/table/filter/search-table-filter";
import {TimestampTableFilter} from "../../../shared/model/table/filter/timestamp-table-filter";
import {GenericTableComponent} from "../../../shared/components/generic-table/generic-table.component";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {
  StatusColumn,
  SubscribersColumn,
  TimestampColumn,
  TraceIdColumn,
  TraceMoreDataColumn,
  WebhookColumn
} from "./traffic-columns";
import {SelectableTableColumn} from "../../../shared/model/table/column/selectable-table-column";
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {Span} from "../model/span";
import {
  ApplicationColumn,
  CallbackColumn,
  EntityColumn,
  ResponseCodeColumn,
  SpanIdColumn,
  TriesColumn
} from "../subscription-traffic/span-columns";
import {SearchListTableFilter} from "../../../shared/model/table/filter/search-list-table-filter";
import {Pageable} from "../../../shared/request/pageable";
import {ProviderService} from "../service/provider.service";
import {filter, mergeMap} from "rxjs/operators";
import {Application} from "../../webhooks/model/application";
import {Callback} from "../../../shared/model/callback";

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

  readonly entities$: Subject<Array<string>> = new BehaviorSubject<Array<string>>([]);
  readonly entityApplications$: Subject<Array<Application>> = new BehaviorSubject<Array<Application>>([]);
  readonly applicationsCallbacks$: Subject<Array<Callback>> = new BehaviorSubject<Array<Callback>>([]);

  // @ts-ignore
  readonly selectedEntity$: BehaviorSubject<string> = new BehaviorSubject(null);
  // @ts-ignore
  readonly selectedApplication$: BehaviorSubject<Application> = new BehaviorSubject(null);
  // @ts-ignore
  readonly selectedCallback$: BehaviorSubject<Callback> = new BehaviorSubject(null);

  constructor(
    private readonly traceService: TraceService,
    private readonly providerService: ProviderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.providerService.myEntities()
      .subscribe(it => this.entities$.next(it));

    this.selectedEntity$.asObservable()
      .pipe(
        filter(it => it != null),
        mergeMap(it => this.providerService.entityApplications(it))
      )
      .subscribe(it => this.entityApplications$.next(it));

    this.selectedApplication$.asObservable()
      .pipe(
        filter(it => it != null),
        mergeMap(it => this.providerService.applicationCallbacks(it))
      )
      .subscribe(it => this.applicationsCallbacks$.next(it));

    this.selectedCallback$.asObservable()
      .pipe(filter(it => it != null))
      .subscribe(it => console.warn(it));
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
      new SortableTableHeader("Status", "statusUpdate.status"),
      new SortableTableHeader("Timestamp", "statusUpdate.time"),
      new SortableTableHeader("Authorized Subscribers", "consumerMessage.authorizedSubscribers"),
    ]
  }

  get filters(): Array<TableFilter> {
    return [
      new EmptyTableFilter("sticky-cell bg-light-gray", "Webhook_Filter1", ""),
      new EmptyTableFilter("sticky-second-cell sticky-cell bg-light-gray", "Webhook_Filter2", ""),
      new SearchTableFilter("", "traceId", "Trace Id"),
      new SearchTableFilter("", "topic", "Webhook"),
      new SearchListTableFilter("", "status", "Status", TraceStatus),
      new TimestampTableFilter("", "timestamp", "Timestamp"),
      new SearchTableFilter("", "authorizedSubscribers", "Authorized Subscribers"),
      new EmptyTableFilter("", "Webhook_Filter2", ""),
    ]
  }

  get columns(): Array<TableColumn> {
    return [
      new TraceMoreDataColumn("text-center sticky-cell", "Webhook_More_Column"),
      new SelectableTableColumn("sticky-cell sticky-second-cell", "Webhook_Select_Column"),
      new TraceIdColumn("Webhook_TraceId_Column"),
      new WebhookColumn("Webhook_Topic_Column"),
      new StatusColumn("Webhook_Status_Column"),
      new TimestampColumn("Webhook_Timestamp_Column"),
      new SubscribersColumn("Webhook_Auth_Subscribers_Column"),
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

  selectEntity(entity: string | null) {
    // @ts-ignore
    this.selectedEntity$.next(entity);
  }

  selectApplication(application: Application | null) {
    // @ts-ignore
    this.selectedApplication$.next(application);
  }

  selectCallback(callback: Callback | null) {
    // @ts-ignore
    this.selectedCallback$.next(callback);
  }

  get currentEntity(): string {
    return this.selectedEntity$.value;
  }

  get currentApplication(): Application {
    return this.selectedApplication$.value;
  }

  get currentCallback(): Callback {
    return this.selectedCallback$.value;
  }
}
