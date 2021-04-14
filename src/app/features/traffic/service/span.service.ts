import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Api} from "../../../shared/api";
import {SubscriptionTrafficFilter} from "./subscription-traffic-filter";

@Injectable({
  providedIn: 'root'
})
export class SpanService {
  private SPAN_URI = "/traffic/span"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: SpanAdapter
  ) {
  }

  readSpans(filters: SubscriptionTrafficFilter): Observable<Span[]> {
    let params = new HttpParams();
    if(filters.traceId) {
      params = params.set("traceId", filters.traceId);
    }
    if(filters.spanId) {
      params = params.set("spanId", filters.spanId);
    }
    if(filters.application) {
      params = params.set("application", filters.application);
    }
    if(filters.status) {
      params = params.set("status", filters.status);
    }
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' spans`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
