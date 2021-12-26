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
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {LogService} from "../service/log.service";
import {catchError} from "rxjs/operators";
import {BadRequestError} from "../error/bad-request-error";
import {WebhookieServerError} from "../error/webhookie-server-error";
import {DuplicateEntityError} from "../error/duplicate-entity-error";
import {WebhookieError} from "../error/webhookie-error";
import {AuthService} from "../service/auth.service";
import {ToastService} from "../service/toast.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly log: LogService,
    private readonly toastService: ToastService,
    @Inject("Auth") private readonly authService: AuthService
  ) {
  }

  private formatErrors(error: any, request: HttpRequest<unknown>) {
    if(error == 401) {
      this.authService.refreshToken();
      return EMPTY
    }

    let result;
    let msg;
    let header;
    if(error.name == HttpErrorResponse.name) {
      let httpError: HttpErrorResponse = error as HttpErrorResponse
      switch (httpError.status) {
        case 400:
          result = new BadRequestError(httpError);
          break;
        case 401:
          result = new WebhookieServerError(httpError, "Authentication Error");
          break;
        case 403:
          result = new WebhookieServerError(httpError, "Authorization Error");
          break;
        case 409:
          result = new DuplicateEntityError(httpError);
          break;
        default:
          result = new WebhookieServerError(httpError, "Server Error");
          break;
      }
      // msg = `<p></p><div>${result.errorMessage()}</div><p><div>${result.extraMessage}</div></p>`;
      msg = `<p></p><div>${result.errorMessage()}</div>`;
      header = result.title
    } else {
      result = new WebhookieError({
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      msg = `<p></p><div>${result.message}</div>`;
      header = "Unknown Error";
    }

    this.showError(request, msg, header);

    return throwError(result);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError(err => this.formatErrors(err, request)));
  }

  showError(request: HttpRequest<unknown>, msg: string, header: string) {
    if (!request.url.includes(environment.apiUrl)) {
      return;
    }

    let reqId = `${request.method} ${request.url.replace(environment.apiUrl, "")}`
    let shouldBeIgnored = this.ignoreRequests.has(reqId);
    this.log.warn(`Checking ${reqId} for errors, ignore? : ${shouldBeIgnored}`)
    if(!shouldBeIgnored) {
      this.toastService.error(msg, header, { delay: 10000 });
    }
  }

  ignoreRequests: Set<string> = new Set<string>([
    "POST /webhookapis",
    "POST /callbacks/test",
    "GET /manage/health",
    "GET /public/config",
    "GET /user",
    "GET /webhookapis",
    "POST /subscriptions"
  ]);
}
