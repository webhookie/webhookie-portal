import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";

export interface Api {
  json(uri: string): Observable<any>
  json(uri: string, params: HttpParams): Observable<any>
  post(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: string): Observable<HttpResponse<any>>;
}
