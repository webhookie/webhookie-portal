import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {LogService} from "./log.service";
import {Api} from "./api";
import {DuplicateEntityError} from "./error/duplicate-entity-error";
import {WebhookieServerError} from "./error/webhookie-server-error";
import {WebhookieError} from "./error/webhookie-error";
import {BadRequestError} from "./error/bad-request-error";

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
    let result;
    if(error.name == HttpErrorResponse.name) {
      let httpError: HttpErrorResponse = error as HttpErrorResponse
      switch (httpError.status) {
        case 400:
          result = new BadRequestError(httpError);
          break;
        case 401:
          result = new WebhookieServerError(httpError);
          break;
        case 409:
          result = new DuplicateEntityError(httpError);
          break;
        default:
          result = new WebhookieServerError(httpError);
      }
    } else if(error == 401) {
      result = new WebhookieError({
        message: "Unauthenticated",
        name: "Unauthenticated"
      });
    } else {
      result = new WebhookieError({
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    return throwError(result);
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
    let strBody = (params.get("Content-Type") == "application/json") ? JSON.stringify(body) : body;
    this.log.debug(`POST json: '${url}', '${strBody}'`)
    return this.http
      .post(url, body, options)
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

