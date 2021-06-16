import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {SpanService} from "../service/span.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Span, SpanStatus, SpanStatusUpdate} from "../model/span";
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
  SpanStatusColumn,
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
import {ModalService} from "../../../shared/service/modal.service";
import {JsonUtils} from "../../../shared/json-utils";
import {TraceService} from "../service/trace.service";
import {HttpMessage} from "../model/http-message";
import {environment} from "../../../../environments/environment";
import {ToastService} from "../../../shared/service/toast.service";
import {LogService} from "../../../shared/service/log.service";
import {SubscriptionService} from "../../../shared/service/subscription.service";
import {EventService, ServerSentEvent} from "../../../shared/service/event.service";
import {filter} from "rxjs/operators";

type SpanContextMenu = ContextMenuItem<Span, SpanMenu>;

@Component({
  selector: 'app-subscription-traffic',
  templateUrl: './subscription-traffic.component.html',
  styleUrls: ['./subscription-traffic.component.css']
})
export class SubscriptionTrafficComponent extends GenericTable<Span, Span> implements AfterViewInit {
  private readonly _spans$: BehaviorSubject<Array<Span>> = new BehaviorSubject<Array<Span>>([]);
  // @ts-ignore
  @ViewChild("tableComponent") tableComponent: GenericTableComponent;
  @ViewChild("resultViewer") resultViewer?: TemplateRef<any>;

  debug = environment.debug

  readonly tableData: Observable<Array<Span>> = this._spans$.asObservable();

  eventTypes = [
    "spanCreated", "spanBlocked",
    "spanFailedWithServerError", "spanFailedWithClientError", "spanFailedWithOtherError",
    "spanFailedStatusUpdate", "spanWasOK", "spanMarkedRetrying", "spanIsRetrying"
  ]

  constructor(
    private readonly log: LogService,
    private readonly toastService: ToastService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: ModalService,
    private readonly spanService: SpanService,
    private readonly traceService: TraceService,
    private readonly eventService: EventService,
    private readonly subscriptionService: SubscriptionService
  ) {
    super();

    this.activatedRoute.queryParams
      .subscribe(it => this.initialFilters = it);

  }

  ngOnDestroy() {
    this.eventService.close("traffic/span/events")
  }

  ngAfterViewInit() {
    this.tableComponent.dataSource.data$
      .pipe(filter(it => it.length > 0))
      .subscribe(spans => {
        // @ts-ignore
        let ids = spans.map(it => it.spanId)
        this.eventService.createEventSource("traffic/span/events", ids, this.eventTypes)
          .subscribe(it => this.handleEvent(it))
      })
  }

  handleEvent(event: ServerSentEvent<any>) {
    this.log.debug(event)
    // @ts-ignore
    let data: Array<Span> = this.tableComponent.dataSource.data$.value;
    let span = data.filter(it => it.spanId == event.data.spanId)[0]
    let lastStatus = event.data.lastStatus
    switch (event.type) {
      case "spanMarkedRetrying":
        span.statusUpdate = new SpanStatusUpdate(
          lastStatus.status,
          lastStatus.time
        )
        span.tries = event.data.totalNumberOfTries
        span.responseCode = -1
        break;
      case "spanIsRetrying":
      case "spanFailedWithServerError":
      case "spanFailedWithClientError":
      case "spanFailedWithOtherError":
      case "spanFailedStatusUpdate":
      case "spanBlocked":
      case "spanWasOK":
        span.statusUpdate = new SpanStatusUpdate(
          lastStatus.status,
          lastStatus.time
        )
        span.tries = event.data.totalNumberOfTries
        span.responseCode = event.data.latestResult.statusCode
        break;
      default:
        console.warn(event)
    }
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
      new EmptyTableFilter("sticky-cell bg-light-gray", "Subscription_Filter1", ""),
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
      new SelectableTableColumn<Span>("sticky-cell", "Subscription_Select_Column", (data => data.canBeRetried())),
      new TraceIdColumn("Subscription_TraceId_Column"),
      new ApplicationColumn("Subscription_Application_Column"),
      new WebhookColumn("Subscription_Webhook_Column"),
      new CallbackColumn("Subscription_Callback_Column"),
      new TimestampColumn("Subscription_Timestamp_Column"),
      new SpanIdColumn("Subscription_SpanId_Column"),
      new ResponseCodeColumn("Subscription_ResponseCode_Column"),
      new SpanStatusColumn("Subscription_Status_Column"),
      new TriesColumn("Subscription_Tries_Column"),
      new ContextMenuTableColumn(this.createContextMenuItems()),
    ]
  }

  private createContextMenuItems() {
    return [
      ContextMenuItemBuilder
        .create<Span, SpanMenu>(SpanMenu.RETRY)
        .handler(this.retry())
        .isAvailable(this.canBeRetried())
        .build(),
      ContextMenuItemBuilder
        .create<Span, SpanMenu>(SpanMenu.UNBLOCK_SUBSCRIPTION)
        .handler(this.unblockSubscription())
        .isAvailable(this.spanSubscriptionIsBlocked())
        .build(),
      ContextMenuItemBuilder.create<Span, SpanMenu>(SpanMenu.DETAILS).handler(this.details()).build(),
      ContextMenuItemBuilder.create<Span, SpanMenu>(SpanMenu.VIEW_REQUEST).handler(this.viewRequest()).build(),
      ContextMenuItemBuilder.create<Span, SpanMenu>(SpanMenu.VIEW_RESPONSE).handler(this.viewResponse()).build(),
    ];
  }

  canBeRetried(): (span: Span) => boolean {
    return (span) => span.canBeRetried()
  }

  spanSubscriptionIsBlocked(): (span: Span) => boolean {
    return (span) => span.subscriptionIsBlocked()
  }

  fetchDetails(data: any): Observable<boolean> {
    return of(true);
  }

  detailHeaders?: TableHeader[];
  detailColumns?: TableColumn[];

  showBody(message: HttpMessage) {
    this.modalService.open(this.resultViewer!);
    JsonUtils.updateElementWithJson(message);
  }

  unblockSubscription(): (span: Span, item: SpanContextMenu) => any {
    return (span: Span) => {
      this.subscriptionService.unblockSubscription(span.subscription.id)
        .subscribe(it => {
          let message = "Subscription is unblocked successfully!!";
          this.log.info(message);
          this.toastService.success(`${message} : ${it.statusUpdate.status}`, "SUCCESS")
        });
    }
  }

  retry(): (span: Span, item: SpanContextMenu) => any {
    return (span: Span) => {
      this.spanService.retry(span)
        .subscribe(it => {
          this.log.info(`Message(s) resent successfully!!`);
          this.toastService.success("Message(s) resent successfully! response: " + it, "SUCCESS")
        });
    }
  }

  resendSelectedSpans(ids: Array<string>) {
    this.spanService.retryAll(ids)
      .subscribe(it => {
        this.log.info(`${it} Message(s) resent successfully!!`);
        this.toastService.success(`${it} Message(s) resent successfully! response: `, "SUCCESS")
      });
  }

  details(): (span: Span, item: SpanContextMenu) => any {
    return (span: Span) => {
      this.spanService.fetchSpan(span.spanId)
        .subscribe(it => {
          this.modalService.open(this.resultViewer!);
          JsonUtils.updateElement(it);
        });
    }
  }

  viewRequest(): (span: Span, item: SpanContextMenu) => any {
    return (span: Span) => {
      this.traceService.traceRequest(span.traceId)
        .subscribe(it => this.showBody(it));
    }
  }

  viewResponse(): (span: Span, item: SpanContextMenu) => any {
    return (span: Span) => {
      this.spanService.spanResponse(span)
        .subscribe(it => this.showBody(it));
    }
  }
}

enum SpanMenu {
  RETRY = "Retry",
  UNBLOCK_SUBSCRIPTION = "Unblock Subscription",
  DETAILS = "View Details",
  VIEW_REQUEST = "View Request",
  VIEW_RESPONSE = "View Response"
}
