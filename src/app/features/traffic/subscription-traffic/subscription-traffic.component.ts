import {Component, OnInit} from '@angular/core';
import {SpanService} from "../service/span.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Span} from "../model/span";

@Component({
  selector: 'app-subscription-traffic',
  templateUrl: './subscription-traffic.component.html',
  styleUrls: ['./subscription-traffic.component.css']
})
export class SubscriptionTrafficComponent implements OnInit {
  private readonly _spans$: Subject<Span[]> = new ReplaySubject();

  constructor(
    private readonly spanService: SpanService,
  ) { }

  ngOnInit(): void {
    this.spanService.readSpans()
      .subscribe( it => this._spans$.next(it));
  }

  spans(): Observable<Array<Span>> {
    return this._spans$.asObservable();
  }
}
