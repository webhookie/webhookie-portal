import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {TraceAdapter} from "./trace.adapter";
import {Api} from "../../../shared/api";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Trace} from "../model/trace";
import {WebhookTrafficFilter} from "./webhook-traffic-filter";

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private SPAN_URI = "/traffic/trace"
  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: TraceAdapter,
    private readonly spanAdapter: SpanAdapter
  ) {
  }

  readTraces(filters: WebhookTrafficFilter): Observable<Array<Trace>> {
    let params = new HttpParams();
    if(filters.traceId) {
      params = params.set("traceId", filters.traceId);
    }
    if(filters.status) {
      params = params.set("status", filters.status);
    }
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' traces`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }

  readTraceSpans(traceId: string): Observable<Array<Span>> {
    const params = new HttpParams();
    const uri = `${this.SPAN_URI}/${traceId}/spans`
    return this.api.json(uri, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' spans`)))
      .pipe(map(list => {
        return list.map((it: any) => this.spanAdapter.adapt(it))
      }))
  }
}
