import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {TraceAdapter} from "./trace.adapter";
import {Api} from "../../../shared/api";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Trace} from "../model/trace";
import {RequestUtils} from "../../../shared/request/request-utils";
import {Pageable} from "../../../shared/request/pageable";
import {TraceRequest} from "../model/trace-request";
import {HttpParams} from "@angular/common/http";
import {TraceRequestAdapter} from "./trace-request.adapter";

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private TRACE_URI = "/traffic/trace"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: TraceAdapter,
    private readonly traceRequestAdapter: TraceRequestAdapter,
    private readonly spanAdapter: SpanAdapter
  ) {
  }

  readTraces(filter: any, pageable: Pageable): Observable<Array<Trace>> {
    let params = RequestUtils.httpParams(filter, pageable);
    return this.api.json(this.TRACE_URI, params)
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' traces`)),
        map(it => this.adapter.adaptList(it))
      )
  }

  readTraceSpans(traceId: string, filter: any, pageable: Pageable): Observable<Array<Span>> {
    let params = RequestUtils.httpParams(filter, pageable);
    const uri = `${this.TRACE_URI}/${traceId}/spans`
    return this.api.json(uri, params)
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' spans`)),
        map(it => this.spanAdapter.adaptList(it))
      )
  }

  traceRequest(traceId: string): Observable<TraceRequest> {
    let params = new HttpParams()
    let uri = `${this.TRACE_URI}/${traceId}/request`;
    return this.api.json(uri, params)
      .pipe(map(it => this.traceRequestAdapter.adapt(it)))
  }
}
