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
