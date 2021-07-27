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
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Api} from "../../../shared/api";
import {Application} from "../model/application";
import {LogService} from "../../../shared/service/log.service";
import {HttpResponseType} from "../../../shared/service/api.service";
import {Callback} from "../../../shared/model/callback";
import {CallbackAdapter} from "../../../shared/adapter/callback.adapter";

@Injectable({
  providedIn: 'root'
})
export class CallbackService {
  private CALLBACK_TEST_URI = "/callbacks/test"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly adapter: CallbackAdapter,
    private readonly log: LogService
  ) {
  }

  testCallback(request: CallbackValidationRequest): Observable<CallbackResponse> {
    let headers = new HttpHeaders()
      .set("Accept", "*/*")
    Object.keys(request.headers)
      .forEach(k => headers.set(k, request.headers[k]))
    return this.api.post(this.CALLBACK_TEST_URI, request, new HttpParams(), headers, HttpResponseType.TEXT)
      .pipe(
        map((it: HttpResponse<any>) => new CallbackResponse(it.status, it.headers, it.body))
      );
  }

  fetchApplicationCallbacks(application: Application): Observable<Array<Callback>> {
    let uri = `/applications/${application.id}/callbacks`
    return this.api.json(uri)
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' callbacks`)),
        map(it => this.adapter.adaptList(it))
      );
  }

  fetchApplicationCallback(applicationId: string, callbackId: string): Observable<Callback> {
    let uri = `/applications/${applicationId}/callbacks/${callbackId}`
    return this.api.json(uri)
      .pipe(map(it => this.adapter.adapt(it)));
  }

  noOfCallbackSubscriptions(applicationId: string, callbackId: string): Observable<number> {
    let uri = `/applications/${applicationId}/callbacks/${callbackId}/noOfSubscriptions`
    return this.api.json(uri)
      .pipe(
        map(it => it.noOfActiveSubscriptions)
      );
  }

  createCallback(request: CallbackRequest): Observable<Callback> {
    let uri = `/applications/${request.applicationId}/callbacks`
    return this.api.post(uri, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(
        map((it: HttpResponse<any>) => this.adapter.adapt(it.body)),
      )
  }

  updateCallback(request: CallbackRequest, callbackId: string): Observable<Callback> {
    let uri = `/applications/${request.applicationId}/callbacks/${callbackId}`
    return this.api.put(uri, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(
        map((it: HttpResponse<any>) => this.adapter.adapt(it.body)),
      )
  }
}

export interface CallbackValidationRequest {
  httpMethod: string,
  url: string,
  payload: string,
  headers: any,
  secret?: any,
  traceId?: string,
  spanId?: string
}

export interface CallbackRequest {
  name: string,
  applicationId: string,
  httpMethod: string,
  url: string,
  security?: CallbackSecurityRequest
}

export interface CallbackSecurityRequest {
  secret: CallbackSecret
}

export interface CallbackSecret {
  keyId: string,
  secret: string
}

export class CallbackResponse {
  constructor(
    public responseCode: number,
    public headers: HttpHeaders,
    public responseBody: any
  ) {
  }
}
