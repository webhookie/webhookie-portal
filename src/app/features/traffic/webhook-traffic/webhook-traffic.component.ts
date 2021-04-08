import {Component, OnInit} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Trace} from "../model/trace";
import {TrafficTableHeader} from "../common/traffic-table/header/traffic-table-header";
import {EmptyTrafficHeader} from "../common/traffic-table/header/empty-traffic-header";
import {SelectableTrafficHeader} from "../common/traffic-table/header/selectable-traffic-header";
import {SortableTrafficHeader} from "../common/traffic-table/header/sortable-traffic-header";
import {FilterTrafficHeader} from "../common/traffic-table/header/filter-traffic-header";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent implements OnInit {
  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();

  constructor(
    private readonly traceService: TraceService
  ) {
  }

  ngOnInit(): void {
    this.traceService.subscription_table=false;
    this.traceService.readTraces()
      .subscribe(it => this._traces$.next(it))
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
}
