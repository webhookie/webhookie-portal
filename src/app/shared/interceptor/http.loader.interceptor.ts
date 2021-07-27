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
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogService} from "../service/log.service";
import {environment} from "../../../environments/environment";
import {Constants} from "../constants";


@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(
    private readonly log: LogService
  ) {
  }

/*
  HTTP_LOADER_IGNORE_LIST = [
    "/subscriptions",
    "/traffic/span",
    "/traffic/trace"
  ]
*/

  /**
   * Interceptor inject token in header Authorization
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<any> {
    let reqId = `${req.method} ${req.url.replace(environment.apiUrl, "")}`
    let header = req.headers.get(Constants.HEADER_HIDE_LOADING_KEY);
    if(header) {
      if(!req.url.includes("/manage/health")) {
        this.log.warn(`${reqId} => headers: ${header}`)
      }
    }

/*
    if (!req.url.includes(environment.apiUrl)) {
      return next.handle(req)
    }

    if(req.method.toUpperCase() != "GET") {
      return next.handle(req)
    }

    if(this.HTTP_LOADER_IGNORE_LIST.some(it => req.url.startsWith(environment.apiUrl + it))) {
      this.log.debug(`Ignoring http loader: ${req.method.toUpperCase()} ${req.url}`)

      const headersConfig = Constants.HEADER_HIDE_LOADING;
      const request = req.clone({setHeaders: headersConfig});

      return next.handle(request);
    }
*/


    return next.handle(req);
  }
}
