import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Api} from "../../../shared/api";
import {RequestUtils} from "../../../shared/request/request-utils";
import {Pageable} from "../../../shared/request/pageable";
import {TraceRequestAdapter} from "./trace-request.adapter";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {SpanResponseAdapter} from "./span-response.adapter";
import {SpanResponse} from "../model/span-response";
import {HttpResponseType} from "../../../shared/service/api.service";

@Injectable({
  providedIn: 'root'
})
export class SpanService {
  private SPAN_URI = "/traffic/span"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: SpanAdapter,
    private readonly traceRequestAdapter: TraceRequestAdapter,
    private readonly spanResponseAdapter: SpanResponseAdapter
  ) {
  }

  readSpans(filter: any, pageable: Pageable): Observable<Span[]> {
    let params = RequestUtils.httpParams(filter, pageable);
    return this.api.json(this.SPAN_URI, params)
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' spans`)),
        map(it => this.adapter.adaptList(it))
      )
  }

  spanResponse(span: Span): Observable<SpanResponse> {
    let params = new HttpParams()
    let uri = `${this.SPAN_URI}/${span.spanId}/response`;
    return this.api.json(uri, params)
      .pipe(map(it => this.spanResponseAdapter.adapt(it)))
  }

  retry(span: Span): Observable<string> {
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "*/*")
    return this.api.post(`/traffic/span/resend`, span.spanId, httpParams, headers, HttpResponseType.TEXT)
      .pipe(map((it: HttpResponse<any>) => it.body))
  }
}
