import {Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogService} from "./log.service";
import {Api} from "../api";
import {environment} from "../../../environments/environment";

export enum HttpResponseType {
  JSON = 'json',
  TEXT = 'text'
}

export enum HttpObserveType {
  RESPONSE = 'response'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService implements Api {
  private apiUrl: string = environment.apiUrl

  constructor(
    private readonly log: LogService,
    private readonly http: HttpClient,
  ) {
  }

  private request(
    method: string,
    uri: string,
    body: any,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders(),
    responseType: HttpResponseType = HttpResponseType.JSON
  ): Observable<HttpResponse<any>> {
    let options: HttpRequestOptions = {
      params: params,
      headers: headers,
      body: body,
      responseType: responseType,
      observe: HttpObserveType.RESPONSE
    };
    let url = `${this.apiUrl}${uri}`;

    return this.http.request(method, url, options)
  }

  public json(
    uri: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<any> {

    let option = {
      params,
      headers
      // observe: 'response'
    };
    let url = `${this.apiUrl}${uri}`;

    return this.http.get(url, option)
  }

  post(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: HttpResponseType): Observable<HttpResponse<any>> {
    return this.request("POST", uri, body, params, headers, responseType)
  }

  put(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: HttpResponseType): Observable<HttpResponse<any>> {
    return this.request("PUT", uri, body, params, headers, responseType)
  }
}

interface HttpRequestOptions {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  reportProgress?: boolean;
  observe: HttpObserveType;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  responseType?: HttpResponseType;
  withCredentials?: boolean;
}

