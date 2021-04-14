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
import {TableSort} from "../common/traffic-table/filter/table-sort";

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

  readTraces(filter: WebhookTrafficFilter, sort?: TableSort): Observable<Array<Trace>> {
    let params = new HttpParams();
    Object.entries(filter)
      .filter(entry => entry[1] != "")
      .forEach(entry => {
        console.warn(entry);
        params = params.set(entry[0], entry[1]);
      })
    params = params.set("size", "20");
    params = params.set("page", "0");

    if(sort) {
      params = params.set("sort", `${sort.field.name},${sort.order}`);
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
