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

import {Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogService} from "./log.service";
import {Api} from "../api";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

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

  public readLoadAsset(uri: string): Observable<any> {
    let headers = new HttpHeaders()
      .set("Accept", ["text/plain"]);
    let options: HttpRequestOptions = {
      headers: headers,
      responseType: HttpResponseType.TEXT,
      observe: HttpObserveType.RESPONSE
    };
    return this.http.request("GET", uri, options)
      .pipe(
        tap(it => console.warn(it))
      )
  }

  post(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: HttpResponseType): Observable<HttpResponse<any>> {
    return this.request("POST", uri, body, params, headers, responseType)
  }

  put(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: HttpResponseType): Observable<HttpResponse<any>> {
    return this.request("PUT", uri, body, params, headers, responseType)
  }

  delete(uri: string, headers: HttpHeaders, responseType: HttpResponseType): Observable<any> {
    let url = `${this.apiUrl}${uri}`;
    let options: HttpRequestOptions = {
      headers: headers,
      responseType: responseType,
      observe: HttpObserveType.RESPONSE
    };
    return this.http.request("DELETE", url, options);
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

