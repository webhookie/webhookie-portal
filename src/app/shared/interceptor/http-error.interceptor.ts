import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {LogService} from "../service/log.service";
import {catchError} from "rxjs/operators";
import {BadRequestError} from "../error/bad-request-error";
import {WebhookieServerError} from "../error/webhookie-server-error";
import {DuplicateEntityError} from "../error/duplicate-entity-error";
import {WebhookieError} from "../error/webhookie-error";
import {AuthService} from "../service/auth.service";
import {AlertService} from "../service/alert.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly log: LogService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService
  ) {
  }

  private formatErrors(error: any) {
    if(error == 401) {
      this.authService.refreshToken();
      return EMPTY
    }

    let result;
    let msg;
    if(error.name == HttpErrorResponse.name) {
      let httpError: HttpErrorResponse = error as HttpErrorResponse
      switch (httpError.status) {
        case 400:
          result = new BadRequestError(httpError);
          msg = `<p></p><div>${result.message}</div><p><div>${result.body?.message}</div></p>`;
          break;
        case 401:
          result = new WebhookieServerError(httpError);
          msg = `<p></p><div>${result.message}</div><p><div>${result.body?.message}</div></p>`;
          break;
        case 409:
          result = new DuplicateEntityError(httpError);
          msg = `<p></p><div>${result.message}</div><p><div>${result.body?.message}</div></p>`;
          break;
        default:
          result = new WebhookieServerError(httpError);
          msg = `<p></p><div>${result.message}</div><p><div>${result.body?.message}</div></p>`;
          break;
      }
    } else {
      result = new WebhookieError({
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      msg = `<p></p><div>${result.message}</div>`;
    }

    this.alertService.error(msg, result.name, {enableHtml: true, positionClass: "toast-center-center"});
    return throwError(result);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError(err => this.formatErrors(err)));
  }
}
