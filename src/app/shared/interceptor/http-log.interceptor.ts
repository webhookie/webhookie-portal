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

import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogService} from "../service/log.service";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable()
export class HttpLogInterceptor implements HttpInterceptor {

  constructor(
    private readonly log: LogService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes(environment.apiUrl)) {
      return next.handle(request);
    }

    if(request.url.includes("/manage/health")) {
      return next.handle(request);
    }

    this.log.info(`${request.method} ${request.url} ${request.params.toString()}`);
    if(!environment.production) {
      let body = request.body;
      if(body) {
        let strBody = (request.headers.get("Content-Type")?.includes("application/json"))
          ? JSON.stringify(body)
          : body;
        this.log.debug(`${strBody}`);
      }
    }

    return next.handle(request)
      .pipe(tap(it => {
        if(!environment.production && it.type == HttpEventType.Response) {
          this.log.debug(it);
        }
      }))
  }
}
