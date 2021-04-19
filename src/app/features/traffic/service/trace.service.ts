import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {TraceAdapter} from "./trace.adapter";
import {Api} from "../../../shared/api";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Trace} from "../model/trace";
import {RequestUtils} from "../../../shared/request/request-utils";
import {Pageable} from "../../../shared/request/pageable";

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

  readTraces(filter: any, pageable: Pageable): Observable<Array<Trace>> {
    let params = RequestUtils.httpParams(filter, pageable);
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' traces`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }

  readTraceSpans(traceId: string, filter: any, pageable: Pageable): Observable<Array<Span>> {
    let params = RequestUtils.httpParams(filter, pageable);
    const uri = `${this.SPAN_URI}/${traceId}/spans`
    return this.api.json(uri, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' spans`)))
      .pipe(map(list => {
        return list.map((it: any) => this.spanAdapter.adapt(it))
      }))
  }
}
