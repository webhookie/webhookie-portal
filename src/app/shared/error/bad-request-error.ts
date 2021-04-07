import {WebhookieError} from "./webhookie-error";
import {HttpErrorResponse} from "@angular/common/http";

export class BadRequestError extends WebhookieError {
  constructor(httpError: HttpErrorResponse) {
    super(httpError);

    this.name = BadRequestError.name;
  }
}
