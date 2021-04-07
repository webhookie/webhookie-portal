export class WebhookieError implements Error {
  message: string;
  name: string;
  stack?: any;

  constructor(
    init: {
      message?: string;
      name?: string;
      stack?: any;
    }
  ) {
    this.message = init.message ? init.message : ""
    this.name = init.name ? init.name : "WebhookieException"
  }
}
