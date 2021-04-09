import {Component, OnInit, ViewChild} from '@angular/core';
import {SpanService} from "../service/span.service";
import {EMPTY, Observable, ReplaySubject, Subject} from "rxjs";
import {Span} from "../model/span";
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

@Component({
  selector: 'app-subscription-traffic',
  templateUrl: './subscription-traffic.component.html',
  styleUrls: ['./subscription-traffic.component.css']
})
export class SubscriptionTrafficComponent implements OnInit, TrafficTable<Span, Span> {
  private readonly _spans$: Subject<Array<Span>> = new ReplaySubject();
  // @ts-ignore
  @ViewChild("trafficTableComponent") trafficTableComponent: TrafficTableComponent;

  constructor(
    private readonly spanService: SpanService,
  ) {
  }

  ngOnInit(): void {
    this.spanService.readSpans()
      .subscribe(it => this._spans$.next(it));

    this.spans$()
      .subscribe(it => this.trafficTableComponent.tableData.next(it));
  }

  spans$(): Observable<Array<Span>> {
    return this._spans$.asObservable();
  }

  get tableHeaders(): Array<TrafficTableHeader> {
    return [
      new SelectableTrafficHeader("sticky-cell"),
      new SortableTrafficHeader("Trace Id"),
      new SortableTrafficHeader("Application"),
      new SortableTrafficHeader("Webhook"),
      new SortableTrafficHeader("Callback URL"),
      new SortableTrafficHeader("Timestamp"),
      new SortableTrafficHeader("Span Id"),
      new SortableTrafficHeader("Response Code"),
      new SortableTrafficHeader("Status"),
      new SortableTrafficHeader("Tries"),
    ]
  }

  get tableFilters(): Array<TrafficTableFilter> {
    return [
      new EmptyTrafficFilter("sticky-cell bg-light-gray"),
      new SearchTrafficFilter("", "Trace Id"),
      new SearchTrafficFilter("", "Application"),
      new SearchListTrafficFilter("", "Webhook"),
      new SearchListTrafficFilter("", "Callback Url"),
      new TimestampTrafficFilter("", "Timestamp"),
      new SearchTrafficFilter("", "Span Id"),
      new SearchTrafficFilter("", "Response Code"),
      new SearchTrafficFilter("", "Status"),
      new EmptyTrafficFilter("", ""),
      new EmptyTrafficFilter("", ""),
    ]
  }

  get tableColumns(): Array<TrafficTableColumn> {
    return [
      new SelectableTrafficColumn("sticky-cell"),
      new TraceIdColumn(),
      new ApplicationColumn(),
      new WebhookColumn(),
      new CallbackColumn(),
      new TimestampColumn(),
      new SpanIdColumn(),
      new ResponseCodeColumn(),
      new StatusColumn(),
      new TriesColumn(),
  ]
  }

  loadDetails(data: any): Observable<Array<any>> {
    return EMPTY;
  }
}
