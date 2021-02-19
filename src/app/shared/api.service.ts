import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.apiUrl

  private static formatErrors(error: any) {
    console.error(error)
    return throwError(error.error);
  }

  constructor(private readonly http: HttpClient) { }

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
    console.debug(`GET json: '${url}'`)
    return this.http
      .get(url, option)
      .pipe(catchError(ApiService.formatErrors));
  }
}
