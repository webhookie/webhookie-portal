import {WebhookieError} from "./webhookie-error";
import {HttpErrorResponse} from "@angular/common/http";

export class WebhookieServerError extends WebhookieError{
  error: HttpErrorResponse;
  body?: any

  constructor(httpError: HttpErrorResponse) {
    super({
      message: httpError.error ? httpError.error.message : httpError.message,
      name: "WebhookieServerError",
      stack: null
    });
    this.name = WebhookieServerError.name;
    this.body = httpError.error;
    this.error = httpError;
  }

  // noinspection JSUnusedGlobalSymbols
  get extraMessage(): string {
    return this.error.message;
  }

  // @ts-ignore
  jsonOr(): any | null {
    let type = typeof this.body;
    try {
      if((type === "string") || (this.body instanceof String)) {
        return JSON.parse(this.body)
      }

      return this.body
    } catch (e) {
      if(type == "string") {
        return null
      }

      return this.body
    }
  }
}
