import {HttpParams, HttpResponse} from "@angular/common/http";
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

  post(uri: string, body: any, params: HttpParams): Observable<HttpResponse<any>> {
    if(uri.startsWith("/callbacks/test")) {
      return of(new HttpResponse<string>(
        {
          body: "OK",
          status: 200,
          statusText: "OK",
          url: uri
        }
      ));
    }

    return EMPTY;
  }
}
