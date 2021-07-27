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

import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {LogService} from "../service/log.service";
import {environment} from "../../../environments/environment";


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    @Inject("Auth") private authService: AuthService,
    private readonly log: LogService
  ) {
  }

  /**
   * Interceptor inject token in header Authorization
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<any> {
    if (req.url.includes("/public/")) {
      return next.handle(req)
    }
    if (req.url.includes("/manage/health")) {
      return next.handle(req)
    }
    if (!req.url.includes(environment.apiUrl)) {
      return next.handle(req)
    }

    this.log.debug(`Adding token to the request: ${req.url}`)

    const headersConfig = {};
    const token = this.authService.getToken();
    if (token) {
      // @ts-ignore
      headersConfig["Authorization"] = `Bearer ${token}`;
    }
    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request).pipe(
      // @ts-ignore
      catchError(error => {
        switch (error.status) {
          case 401:
            this.log.error(`401 Response from ${req.method} ${req.url}`)
            return observableThrowError('401')
          case 0:
            this.log.error("ERROR!!!")
            return null;
        }
        throw error;
      })
    );
  }

  ignoreRequests: Set<string> = new Set<string>([
    "/public/",
    "/manage/health",
  ]);

}
