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

  readonly tableData: Observable<Array<Span>> = this._spans$.asObservable();

  constructor(
    private readonly spanService: SpanService,
  ) {
  }

  ngOnInit(): void {
  }

  loadData() {
    this.spanService.readSpans()
      .subscribe(it => this._spans$.next(it));
  }

  get tableHeaders(): Array<TrafficTableHeader> {
    return [
      new SelectableTrafficHeader("sticky-cell", "Subscription_Select_Header"),
      new SortableTrafficHeader("Trace Id", "Subscription_Trace_Id_Header"),
      new SortableTrafficHeader("Application", "Subscription_Application_Header"),
      new SortableTrafficHeader("Webhook", "Subscription_Webhook_Header"),
      new SortableTrafficHeader("Callback URL", "Subscription_Callback_Header"),
      new SortableTrafficHeader("Timestamp", "Subscription_Timestamp_Header"),
      new SortableTrafficHeader("Span Id", "Subscription_Span_Id_Header"),
      new SortableTrafficHeader("Response Code", "Subscription_Response_Code_Header"),
      new SortableTrafficHeader("Status", "Subscription_Status_Header"),
      new SortableTrafficHeader("Tries", "Subscription_Tries_Header"),
    ]
  }

  get tableFilters(): Array<TrafficTableFilter> {
    return [
      new EmptyTrafficFilter("sticky-cell bg-light-gray", "Subscription_Filter1"),
      new SearchTrafficFilter("", "Subscription_Trace_Id_Filter", "Trace Id"),
      new SearchTrafficFilter("", "Subscription_Application_Filter", "Application"),
      new SearchListTrafficFilter("", "Subscription_Webhook_Filter", "Webhook"),
      new SearchListTrafficFilter("", "Subscription_Callback_Url_Filter", "Callback Url"),
      new TimestampTrafficFilter("", "Subscription_Timestamp_Filter", "Timestamp"),
      new SearchTrafficFilter("", "Subscription_Span_Id_Filter", "Span Id"),
      new SearchTrafficFilter("", "Subscription_Response_Code_Filter", "Response Code"),
      new SearchTrafficFilter("", "Subscription_Status_Filter", "Status"),
      new EmptyTrafficFilter("", "Subscription_Filter2", ""),
      new EmptyTrafficFilter("", "Subscription_Filter3", ""),
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
