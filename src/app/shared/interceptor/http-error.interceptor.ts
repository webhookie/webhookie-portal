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
          result = new WebhookieServerError(httpError);
          break;
        case 403:
          result = new WebhookieServerError(httpError);
          break;
        case 409:
          result = new DuplicateEntityError(httpError);
          break;
        default:
          result = new WebhookieServerError(httpError);
          break;
      }
      msg = `<p></p><div>${result.message}</div><p><div>${result.extraMessage}</div></p>`;
      header = result.name
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
    "POST /webhookgroups",
    "GET /manage/health",
    "GET /public/config",
    "GET /user",
    "GET /webhookgroups",
    "POST /subscriptions"
  ]);
}
