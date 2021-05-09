import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogService} from "./log.service";
import {Api} from "../api";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements Api {
  public static RESPONSE_TYPE_JSON = "json"
  public static RESPONSE_TYPE_TEXT = "text"

  private apiUrl: string = environment.apiUrl

  constructor(
    private readonly log: LogService,
    private readonly http: HttpClient,
  ) {
  }

  //TODO: refactor
  public post(
    uri: string,
    body: any,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders(),
    responseType: string = ApiService.RESPONSE_TYPE_JSON
  ): Observable<HttpResponse<any>> {
    let options = {};
    if (params) {
      options = {
        params,
        headers,
        responseType: responseType,
        observe: 'response'
      };
    }
    let url = `${this.apiUrl}${uri}`;
    // @ts-ignore
    return this.http.post(url, body, options)
  }

  public json(
    uri: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {

    let option = {};
    if (params) {
      option = {
        params
        // observe: 'response'
      };
    }
    let url = `${this.apiUrl}${uri}`;

    return this.http.get(url, option)
  }
}

