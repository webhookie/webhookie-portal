import { Component, OnInit } from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Span} from "../model/span";
import {Trace} from "../model/trace";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent implements OnInit {
  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();

  constructor(
    private readonly traceService: TraceService
  ) { }

  ngOnInit(): void {
    this.traceService.readTraces()
      .subscribe( it => this._traces$.next(it))
  }

  traces$(): Observable<Array<Trace>> {
    return this._traces$.asObservable()
  }
}
