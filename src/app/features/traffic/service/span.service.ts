/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Api} from "../../../shared/api";
import {RequestUtils} from "../../../shared/request/request-utils";
import {Pageable} from "../../../shared/request/pageable";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {SpanResponseAdapter} from "./span-response.adapter";
import {SpanResponse} from "../model/span-response";
import {HttpResponseType} from "../../../shared/service/api.service";
import {SpanRequest} from "../model/span-request";
import {SpanRequestAdapter} from "./span-request.adapter";

@Injectable({
  providedIn: 'root'
})
export class SpanService {
  private SPAN_URI = "/traffic/span"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: SpanAdapter,
    private readonly spanRequestAdapter: SpanRequestAdapter,
    private readonly spanResponseAdapter: SpanResponseAdapter
  ) {
  }

  readSpans(filter: any, pageable: Pageable): Observable<Span[]> {
    let params = RequestUtils.httpParams(filter, pageable);
    return this.api.json(this.SPAN_URI, params, RequestUtils.hideLoadingHeader())
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' spans`)),
        map(it => this.adapter.adaptList(it))
      )
  }

  spanRequest(spanId: string): Observable<SpanRequest> {
    let params = new HttpParams()
    let uri = `${this.SPAN_URI}/${spanId}/request`;
    return this.api.json(uri, params)
      .pipe(map(it => this.spanRequestAdapter.adapt(it)))
  }

  spanResponse(span: Span): Observable<SpanResponse> {
    let params = new HttpParams()
    let uri = `${this.SPAN_URI}/${span.spanId}/response`;
    return this.api.json(uri, params)
      .pipe(map(it => this.spanResponseAdapter.adapt(it)))
  }

  fetchSpan(spanId: string): Observable<any> {
    let params = new HttpParams()
    let uri = `${this.SPAN_URI}/${spanId}`;
    return this.api.json(uri, params)
  }

  retry(span: Span): Observable<string> {
    return this.retryAll([span.spanId])
  }

  retryAll(ids: Array<string>): Observable<string> {
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "*/*")
    return this.api.post(`/traffic/span/resend`, ids, httpParams, headers, HttpResponseType.TEXT)
      .pipe(map((it: HttpResponse<any>) => it.body))
  }
}
