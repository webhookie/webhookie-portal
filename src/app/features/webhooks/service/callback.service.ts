import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Api} from "../../../shared/api";

@Injectable({
  providedIn: 'root'
})
export class CallbackService {
  private CALLBACK_TEST_URI = "/callbacks/test"

  constructor(
    @Inject("Api") private readonly api: Api
  ) {
  }

  testCallback(request: CallbackValidationRequest): Observable<CallbackResponse> {
    let params = new HttpParams()
      .set("Content-Type", "application/json")
      .set("Accept", "*/*")
    return this.api.post(this.CALLBACK_TEST_URI, request, params)
      .pipe(
        map((it: HttpResponse<any>) => new CallbackResponse(it.status, it.headers, it.body))
      );
  }
}

export interface CallbackValidationRequest {
  httpMethod: string,
  url: string,
  payload: string,
  headers: any,
  secret?: string,
  traceId?: string,
  spanId?: string
}

export class CallbackResponse {
  constructor(
    public responseCode: number,
    public headers: HttpHeaders,
    public responseBody: any
  ) {
  }
}
