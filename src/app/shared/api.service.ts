import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {LogService} from "./log.service";
import {Api} from "./api";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements Api {
  public static RESPONSE_TYPE_JSON = "json"
  public static RESPONSE_TYPE_TEXT = "text"

  private apiUrl: string = environment.apiUrl

  constructor(
    private readonly log: LogService,
    private readonly http: HttpClient
  ) {
  }

  private static formatErrors(error: any) {
    return throwError(error.error);
  }

  //TODO: refactor
  public post(
    uri: string,
    body: any,
    params: HttpParams = new HttpParams(),
    responseType: string = ApiService.RESPONSE_TYPE_JSON
  ): Observable<HttpResponse<any>> {
    let option = {};
    if (params) {
      option = {
        params,
        responseType: responseType,
        observe: 'response'
      };
    }
    let url = `${this.apiUrl}${uri}`;
    let strBody = (params.get("Content-Type") == "application/json") ? JSON.stringify(body) : body;
    this.log.debug(`POST json: '${url}', '${strBody}'`)
    return this.http
      .post(url, body, option)
      .pipe(tap(it => this.log.debug(it)))
      // @ts-ignore
      .pipe(catchError(ApiService.formatErrors));
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

    this.log.debug(`GET json: '${url}', ${params.toString()}`)
    return this.http
      .get(url, option)
      .pipe(catchError(ApiService.formatErrors));
  }
}

