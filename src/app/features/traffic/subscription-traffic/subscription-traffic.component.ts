import {Component, OnInit} from '@angular/core';
import {SpanService} from "../service/span.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Span} from "../model/span";
import {TraceService}from 'src/app/features/traffic/service/trace.service';
import {TrafficTableHeader} from "../common/traffic-table/header/traffic-table-header";
import {SelectableTrafficHeader} from "../common/traffic-table/header/selectable-traffic-header";
import {SortableTrafficHeader} from "../common/traffic-table/header/sortable-traffic-header";
import {TrafficTableFilter} from "../common/traffic-table/filter/traffic-table-filter";
import {SearchTrafficFilter} from "../common/traffic-table/filter/search-traffic-filter";
import {SearchListTrafficFilter} from "../common/traffic-table/filter/search-list-traffic-filter";
import {TimestampTrafficFilter} from "../common/traffic-table/filter/timestamp-traffic-filter";
import {EmptyTrafficFilter} from "../common/traffic-table/filter/empty-traffic-filter";

@Component({
  selector: 'app-subscription-traffic',
  templateUrl: './subscription-traffic.component.html',
  styleUrls: ['./subscription-traffic.component.css']
})
export class SubscriptionTrafficComponent implements OnInit {
  private readonly _spans$: Subject<Array<Span>> = new ReplaySubject();

  constructor(
    private readonly spanService: SpanService,
    private traceService: TraceService,
  ) {

  }

  ngOnInit(): void {
    this.traceService.subscription_table=true;
    this.spanService.readSpans()
      .subscribe(it => this._spans$.next(it));
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
}
