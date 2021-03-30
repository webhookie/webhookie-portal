import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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
    params: HttpParams = new HttpParams()
  ): Observable<HttpResponse<any>> {
    let option = {};
    if (params) {
      option = {
        params,
        responseType: 'text',
        observe: 'response'
      };
    }
    let url = `${this.apiUrl}${uri}`;
    let strBody = (params.get("Content-Type") == "application/json") ? JSON.stringify(body) : body;
    this.log.debug(`POST json: '${url}', '${strBody}'`)
    return this.http
      .post(url, body, option)
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
    this.log.debug(`GET json: '${url}'`)
    return this.http
      .get(url, option)
      .pipe(catchError(ApiService.formatErrors));
  }
}
