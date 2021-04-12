import {Component, OnInit, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Trace} from "../model/trace";
import {
  BaseTrafficTableHeader,
  SimpleTrafficTableHeader,
  TrafficTableHeader
} from "../common/traffic-table/header/traffic-table-header";
import {EmptyTrafficHeader} from "../common/traffic-table/header/empty-traffic-header";
import {SelectableTrafficHeader} from "../common/traffic-table/header/selectable-traffic-header";
import {SortableTrafficHeader} from "../common/traffic-table/header/sortable-traffic-header";
import {TrafficTableFilter} from "../common/traffic-table/filter/traffic-table-filter";
import {EmptyTrafficFilter} from "../common/traffic-table/filter/empty-traffic-filter";
import {SearchTrafficFilter} from "../common/traffic-table/filter/search-traffic-filter";
import {SearchListTrafficFilter} from "../common/traffic-table/filter/search-list-traffic-filter";
import {TimestampTrafficFilter} from "../common/traffic-table/filter/timestamp-traffic-filter";
import {TrafficTableComponent} from "../common/traffic-table/traffic-table.component";
import {TrafficTableColumn} from "../common/traffic-table/column/traffic-table-column";
import {
  StatusColumn,
  StatusDescriptionColumn,
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
  CallbackColumn, EntityColumn,
  ResponseCodeColumn,
  SpanIdColumn, TriesColumn
} from "../subscription-traffic/span-columns";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent implements OnInit, TrafficTable<Trace, Span> {
  // @ts-ignore
  @ViewChild("trafficTableComponent") trafficTableComponent: TrafficTableComponent;

  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();
  readonly tableData: Observable<Array<Trace>> = this._traces$.asObservable();

  constructor(
    private readonly traceService: TraceService
  ) {
  }

  ngOnInit(): void {
    // this.traces$()
    //   .subscribe(it => {
    //     console.warn(11)
    //     this.trafficTableComponent.tableData.next(it)
    //   })
  }

  loadData() {
    this.traceService.readTraces()
      .subscribe(it => {
        this._traces$.next(it)
      })
  }

  traces$(): Observable<Array<Trace>> {
    return this._traces$.asObservable()
  }

  get tableHeaders(): Array<TrafficTableHeader> {
    return [
      new EmptyTrafficHeader("sticky-cell"),
      new SelectableTrafficHeader("sticky-cell sticky-second-cell"),
      new SortableTrafficHeader("Trace Id"),
      new SortableTrafficHeader("Webhook"),
      new SortableTrafficHeader("Authorized Subscribers"),
      new SortableTrafficHeader("Timestamp"),
      new SortableTrafficHeader("Status"),
      new SortableTrafficHeader("Status Description"),
    ]
  }

  get tableFilters(): Array<TrafficTableFilter> {
    return [
      new EmptyTrafficFilter("sticky-cell bg-light-gray"),
      new EmptyTrafficFilter("sticky-second-cell sticky-cell bg-light-gray"),
      new SearchTrafficFilter("", "Trace Id"),
      new SearchListTrafficFilter("", "Application"),
      new SearchTrafficFilter("", "Authorized Subscribers"),
      new TimestampTrafficFilter("", "Timestamp"),
      new SearchTrafficFilter("", "Status"),
      new SearchTrafficFilter("", "Status Description"),
      new EmptyTrafficFilter("", ""),
    ]
  }

  get tableColumns(): Array<TrafficTableColumn> {
    return [
      new TraceMoreDataColumn("text-center sticky-cell"),
      new SelectableTrafficColumn("sticky-cell sticky-second-cell"),
      new TraceIdColumn(),
      new WebhookColumn(),
      new SubscribersColumn(),
      new TimestampColumn(),
      new StatusColumn(),
      new StatusDescriptionColumn(),
    ];
  }

  get detailHeaders(): Array<TrafficTableHeader> {
    return [
      new SimpleTrafficTableHeader("Span Id"),
      new SimpleTrafficTableHeader("Company"),
      new SimpleTrafficTableHeader("Application"),
      new SimpleTrafficTableHeader("Callback URL"),
      new SimpleTrafficTableHeader("Timestamp"),
      new SimpleTrafficTableHeader("Response code"),
      new SimpleTrafficTableHeader("Status"),
      new SimpleTrafficTableHeader("Tries"),
      new SimpleTrafficTableHeader("")
    ]
  }

  get detailColumns(): Array<TrafficTableColumn> {
    return [
      new SpanIdColumn(),
      new EntityColumn(),
      new ApplicationColumn(),
      new CallbackColumn(),
      new TimestampColumn(),
      new ResponseCodeColumn(),
      new StatusColumn(),
      new TriesColumn(),
    ]
  }

  loadDetails(data: Trace): Observable<Array<Span>> {
    data.loading();
    return this.traceService.readTraceSpans(data.traceId)
  }
}
