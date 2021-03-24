import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.apiUrl

  private formatErrors(error: any) {
    this.log.error(error)
    return throwError(error.error);
  }

  constructor(
    private readonly log: LogService,
    private readonly http: HttpClient
  ) { }

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
      .pipe(catchError(this.formatErrors));
  }
}
