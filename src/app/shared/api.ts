import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {HttpResponseType} from "./service/api.service";

export interface Api {
  json(uri: string): Observable<any>
  json(uri: string, params: HttpParams): Observable<any>
  json(uri: string, params: HttpParams, headers: HttpHeaders): Observable<any>

  post(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: HttpResponseType): Observable<HttpResponse<any>>;
  put(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: HttpResponseType): Observable<HttpResponse<any>>;
}
