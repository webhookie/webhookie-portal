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
  TraceStatusColumn,
  SubscribersColumn,
  TimestampColumn,
  TraceIdColumn,
  TraceMoreDataColumn,
  WebhookColumn
} from "./trace-columns";
import {SelectableTableColumn} from "../../../shared/model/table/column/selectable-table-column";
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {Span} from "../model/span";
import {
  ApplicationColumn,
  CallbackColumn,
  EntityColumn,
  ResponseCodeColumn,
  SpanIdColumn, SpanStatusColumn,
  TriesColumn
} from "../subscription-traffic/span-columns";
import {SearchListTableFilter} from "../../../shared/model/table/filter/search-list-table-filter";
import {Pageable} from "../../../shared/request/pageable";
import {ProviderService} from "../service/provider.service";
import {filter, map, mergeMap, skip, tap} from "rxjs/operators";
import {Application} from "../../webhooks/model/application";
import {Callback} from "../../../shared/model/callback";
import {ContextMenuTableColumn} from "../../../shared/model/table/column/context-menu-table-column";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../shared/model/table/column/context-menu-item";
import {ActivatedRoute} from "@angular/router";

type TraceContextMenu = ContextMenuItem<Trace, TraceMenu>;
type TraceSpanContextMenu = ContextMenuItem<Span, TraceSpansMenu>;

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

  readonly spanFilter$: BehaviorSubject<WebhookTrafficFilter> = new BehaviorSubject<WebhookTrafficFilter>({});

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly traceService: TraceService,
    private readonly providerService: ProviderService
  ) {
    super();

    this.activatedRoute.queryParams
      .subscribe(it => this.initialFilters = it);
  }

  ngOnInit(): void {
    this.providerService.myEntities()
      .subscribe(it => this.entities$.next(it));

    this.spanFilter$.asObservable()
      .pipe(
        filter(it => it.entity != null),
        mergeMap(it => this.providerService.entityApplications(it.entity!))
      )
      .subscribe(it => this.entityApplications$.next(it));

    this.spanFilter$.asObservable()
      .pipe(
        filter(it => it.application != null),
        mergeMap(it => this.providerService.applicationCallbacks(it.application!))
      )
      .subscribe(it => this.applicationsCallbacks$.next(it));

    this.spanFilter$.asObservable()
      .pipe(skip(1))
      .subscribe(it => {
        this._traces$.next([]);
        let filter = this.tableComponent.currentFilter.value;
        filter["entity"] = it.entity
        filter["application"] = it.application?.id
        filter["callback"] = it.callback?.callbackId

        this.tableComponent.currentFilter.next(filter);
      });
  }

  fetchData(filter: any, pageable: Pageable) {
    this.traceService.readTraces(filter, pageable)
      .subscribe(it => this._traces$.next(it));
  }

  get headers(): Array<TableHeader> {
    return [
      new EmptyTableHeader("sticky-cell", "Webhook_Header1"),
      new SelectableTableHeader("sticky-cell sticky-second-cell", "Webhook_Header2"),
      new SortableTableHeader("Trace Id", "traceId"),
      new SortableTableHeader("Webhook", "topic"),
      new SortableTableHeader("Status", "statusUpdate.status", "text-center"),
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
      new TraceStatusColumn("Webhook_Status_Column"),
      new TimestampColumn("Webhook_Timestamp_Column"),
      new SubscribersColumn("Webhook_Auth_Subscribers_Column"),
      new ContextMenuTableColumn(this.createTraceContextMenuItems()),
    ];
  }

  private createTraceContextMenuItems() {
    return [
      ContextMenuItemBuilder.create<Trace, TraceMenu>(TraceMenu.VIEW_REQUEST).handler(this.viewTraceRequest()).build(),
      ContextMenuItemBuilder.create<Trace, TraceMenu>(TraceMenu.RETRY).handler(this.retryTrace()).build(),
    ];
  }

  retryTrace(): (trace: Trace, item: TraceContextMenu) => any {
    return (it: Trace, item: TraceContextMenu) => {
      console.warn(`${item.item} ==> ${it.traceId}`);
    }
  }

  viewTraceRequest(): (trace: Trace, item: TraceContextMenu) => any {
    return (it: Trace, item: TraceContextMenu) => {
      console.warn(`${item.item} ==> ${it.traceId}`);
    }
  }

  get detailHeaders(): Array<TableHeader> {
    return [
      new SimpleTableHeader("Span Id", "Webhook_Details_Span_Id_Header"),
      new SimpleTableHeader("Company", "Webhook_Details_Company_Header"),
      new SimpleTableHeader("Application", "Webhook_Details_Application_Header"),
      new SimpleTableHeader("Callback URL", "Webhook_Details_Callback_Header"),
      new SimpleTableHeader("Timestamp", "Webhook_Details_Timestamp_Header"),
      new SimpleTableHeader("Response code", "Webhook_Details_Response_Code_Header"),
      new SimpleTableHeader("Status", "Webhook_Details_Status_Header", "text-center"),
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
      new SpanStatusColumn("Webhook_Span_Status_Column"),
      new TriesColumn("Webhook_Span_Tries_Column"),
      new ContextMenuTableColumn(this.createSpanContextMenuItems()),
    ]
  }

  private createSpanContextMenuItems() {
    return [
      ContextMenuItemBuilder.create<Span, TraceSpansMenu>(TraceSpansMenu.RETRY).handler(this.retrySpan()).build(),
      ContextMenuItemBuilder.create<Span, TraceSpansMenu>(TraceSpansMenu.VIEW_REQUEST).handler(this.viewSpanRequest()).build(),
      ContextMenuItemBuilder.create<Span, TraceSpansMenu>(TraceSpansMenu.VIEW_RESPONSE).handler(this.viewSpanResponse()).build(),
    ];
  }

  viewSpanRequest(): (span: Span, item: TraceSpanContextMenu) => any {
    return (it: Span, item: TraceSpanContextMenu) => {
      console.warn(`${item.item} ==> ${it.traceId}`);
    }
  }

  retrySpan(): (span: Span, item: TraceSpanContextMenu) => any {
    return (it: Span, item: TraceSpanContextMenu) => {
      console.warn(`${item.item} ==> ${it.traceId}`);
    }
  }

  viewSpanResponse(): (span: Span, item: TraceSpanContextMenu) => any {
    return (it: Span, item: TraceSpanContextMenu) => {
      console.warn(`${item.item} ==> ${it.traceId}`);
    }
  }

  fetchDetails(data: Trace): Observable<boolean> {
    let filter = {
      entity: this.currentEntity,
      application: this.currentApplication?.id,
      callback: this.currentCallback?.callbackId,
    }
    return this.traceService.readTraceSpans(data.traceId, filter, Pageable.unPaged())
      .pipe(tap(it => data.update(it)))
      .pipe(map(() => true))
  }

  selectEntity(entity?: string) {
    let filter = this.spanFilter
    if(filter.entity == entity) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: entity,
    // @ts-ignore
      application: null,
    // @ts-ignore
      callback: null
    }

    this.spanFilter$.next(newFilter)
  }

  selectApplication(application?: Application) {
    let filter = this.spanFilter
    if(filter.application == application) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: filter.entity,
      application: application,
    // @ts-ignore
      callback: null
    }

    this.spanFilter$.next(newFilter)
  }

  selectCallback(callback?: Callback) {
    let filter = this.spanFilter
    if(filter.callback == callback) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: filter.entity,
      application: filter.application,
      callback: callback
    }

    this.spanFilter$.next(newFilter)
  }

  get spanFilter(): WebhookTrafficFilter {
    return this.spanFilter$.value;
  }

  get currentEntity(): string | null | undefined {
    return this.spanFilter.entity;
  }

  get currentApplication(): Application | null | undefined {
    return this.spanFilter.application;
  }

  get currentCallback(): Callback | null | undefined {
    return this.spanFilter.callback;
  }

  clearEntity() {
    this.selectEntity(undefined)
    this.entityApplications$.next([]);
    this.applicationsCallbacks$.next([]);
  }

  clearApplication() {
    this.selectApplication(undefined)
    this.applicationsCallbacks$.next([]);
  }

  clearCallback() {
    this.selectCallback(undefined)
  }
}

interface WebhookTrafficFilter {
  entity?: string;
  application?: Application;
  callback?: Callback;
}


enum TraceMenu {
  RETRY = "Retry",
  VIEW_REQUEST = "View Request"
}

enum TraceSpansMenu {
  RETRY = "Retry",
  VIEW_REQUEST = "View Request",
  VIEW_RESPONSE = "View Response",
}
