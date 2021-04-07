import {WebhookieError} from "./webhookie-error";
import {HttpErrorResponse} from "@angular/common/http";
import {WebhookieServerError} from "./webhookie-server-error";

export class BadRequestError extends WebhookieServerError {
  constructor(httpError: HttpErrorResponse) {
    super(httpError);

    this.name = BadRequestError.name;
  }
}
