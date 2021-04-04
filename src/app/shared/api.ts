import {Observable} from "rxjs";
import {HttpParams, HttpResponse} from "@angular/common/http";

export interface Api {
  json(uri: string): Observable<any>
  json(uri: string, params: HttpParams): Observable<any>
  post(uri: string, body: any, params: HttpParams, responseType: string): Observable<HttpResponse<any>>;
}
