/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {EMPTY, Observable, of} from "rxjs";
import {Api} from "../api";
import {MockData} from "./modk-data";

export class MockApiService implements Api {
  json(
    uri: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders()
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
