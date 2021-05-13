import {WebhookieServerError} from "./webhookie-server-error";
import {HttpErrorResponse} from "@angular/common/http";

export class DuplicateEntityError extends WebhookieServerError {
  constructor(httpError: HttpErrorResponse) {
    super(httpError);

    this.name = DuplicateEntityError.name;
    this.message = `Entity already exists with key : ${httpError.error.key}`
  }
}
