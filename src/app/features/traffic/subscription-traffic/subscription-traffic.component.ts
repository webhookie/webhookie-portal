import {Component, OnInit, ViewChild} from '@angular/core';
import {SpanService} from "../service/span.service";
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {Span, SpanStatus} from "../model/span";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {SelectableTableHeader} from "../../../shared/model/table/header/selectable-table-header";
import {SortableTableHeader} from "../../../shared/model/table/header/sortable-table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {SearchTableFilter} from "../../../shared/model/table/filter/search-table-filter";
import {SearchListTableFilter} from "../../../shared/model/table/filter/search-list-table-filter";
import {TimestampTableFilter} from "../../../shared/model/table/filter/timestamp-table-filter";
import {EmptyTableFilter} from "../../../shared/model/table/filter/empty-table-filter";
import {GenericTableComponent} from "../../../shared/components/generic-table/generic-table.component";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {SelectableTableColumn} from "../../../shared/model/table/column/selectable-table-column";
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
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {Pageable} from "../../../shared/request/pageable";
import {ContextMenuTableColumn} from "../../../shared/model/table/column/context-menu-table-column";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../shared/model/table/column/context-menu-item";
import {ActivatedRoute} from "@angular/router";

type SpanContextMenu = ContextMenuItem<Span, SpanMenu>;

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly spanService: SpanService,
  ) {
    super();

    this.activatedRoute.queryParams
      .subscribe(it => this.initialFilters = it);
  }

  ngOnInit(): void {
  }

  fetchData(filter: any, pageable: Pageable) {
    this.spanService.readSpans(filter, pageable)
      .subscribe(it => this._spans$.next(it));
  }

  get headers(): Array<TableHeader> {
    return [
      new SelectableTableHeader("sticky-cell", "Subscription_Select_Header"),
      new SortableTableHeader("Trace Id", "traceId"),
      new SortableTableHeader("Application", "subscription.application.name"),
      new SortableTableHeader("Webhook", "subscription.topic"),
      new SortableTableHeader("Callback URL", "subscription.callback.url"),
      new SortableTableHeader("Timestamp", "lastStatus.time"),
      new SortableTableHeader("Span Id", "spanId"),
      new SortableTableHeader("Response Code", "latestResult.statusCode"),
      new SortableTableHeader("Status", "lastStatus.status"),
      new SortableTableHeader("Tries", "retryHistory.length"),
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
      new ContextMenuTableColumn(this.createContextMenuItems()),
    ]
  }

  private createContextMenuItems() {
    return [
      ContextMenuItemBuilder.create<Span, SpanMenu>(SpanMenu.VIEW_REQUEST).handler(this.viewRequest()).build(),
      ContextMenuItemBuilder.create<Span, SpanMenu>(SpanMenu.VIEW_RESPONSE).handler(this.viewResponse()).build(),
      ContextMenuItemBuilder.create<Span, SpanMenu>(SpanMenu.RETRY).handler(this.retrySpan()).build(),
    ];
  }

  fetchDetails(data: any): Observable<boolean> {
    return of(true);
  }

  detailHeaders?: TableHeader[];
  detailColumns?: TableColumn[];

  viewRequest(): (span: Span, item: SpanContextMenu) => any {
    return (it: Span, item: SpanContextMenu) => {
      console.warn(`${item.item} ==> ${it.spanId}`);
    }
  }

  viewResponse(): (span: Span, item: SpanContextMenu) => any {
    return (it: Span, item: SpanContextMenu) => {
      console.warn(`${item.item} ==> ${it.spanId}`);
    }
  }

  retrySpan(): (span: Span, item: SpanContextMenu) => any {
    return (it: Span, item: SpanContextMenu) => {
      console.warn(`${item.item} ==> ${it.spanId}`);
    }
  }
}

enum SpanMenu {
  VIEW_REQUEST = "View Request",
  VIEW_RESPONSE = "View Response",
  RETRY = "Retry",
}
