import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {EMPTY, Observable, of} from "rxjs";
import {Api} from "../api";
import {MockData} from "./modk-data";

export class MockApiService implements Api {
  json(
    uri: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return MockData.for(uri, params)
  }

  post(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: string): Observable<HttpResponse<any>> {
    if (uri.startsWith("/callbacks/test")) {
      return of(new HttpResponse<string>(
        {
          body: "OK",
          status: 200,
          statusText: "OK",
          url: uri
        }
      ));
    }

    if (uri.startsWith("/subscriptions")) {
      return of(new HttpResponse<any>(
        {
          body: {
            id: "1",
            application: {
              id: "1",
              name: "app",
              entity: "entity"
            },
            topic: "Topic",
            callback: {
              id: "1",
              name: "callback",
              httpMethod: "POST",
              url: "http://127.0.0.1:8080"
            },
            statusUpdate: {
              status: "SAVED",
              time: new Date()
            }
          },
          status: 201,
          statusText: "Created",
          url: uri
        }
      ))
    }

    return EMPTY;
  }

  put(uri: string, body: any, params: HttpParams, headers: HttpHeaders, responseType: string): Observable<HttpResponse<any>> {
    return this.post(uri, body, params, headers, responseType);
  }
}
