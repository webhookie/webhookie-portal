import {Component, ViewChild} from '@angular/core';
import {CallbackUrlComponent} from "./callback-url/callback-url.component";
import {ResponseComponent} from "../common/response/response.component";
import {CallbackService, CallbackValidationRequest} from "../service/callback.service";
import {WebhooksContext} from "../webhooks-context";
import {BadRequestError} from "../../../shared/error/bad-request-error";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {WebhookBaseComponent} from "../common/webhook-base-component";
import {ValidateSubscriptionRequest} from "../../../shared/service/subscription.service";

@Component({
  selector: 'app-callback-test',
  templateUrl: './callback-test.component.html',
  styleUrls: ['./callback-test.component.css']
})
export class CallbackTestComponent extends WebhookBaseComponent {
  @ViewChild('callbackUrlComponent') callback!: CallbackUrlComponent
  @ViewChild('responseComponent') response!: ResponseComponent
  @ViewChild('requestExampleComponent') requestExampleComponent!: RequestExampleComponent

  subscribe: boolean = true;

  constructor(
    private readonly context: WebhooksContext,
    private readonly callbackService: CallbackService
  ) {
    super(context)
  }

  ngOnInit(): void {
  }

  get title() {
    return `Test ${this.webhook.topic.name} Webhook`
  }

  test() {
    this.response.invalidate()

    let requestExample: ValidateSubscriptionRequest = this.requestExampleComponent.valueEx();
    let request: CallbackValidationRequest = {
      httpMethod: this.callback.method,
      url: this.callback.url,
      payload: JSON.stringify(requestExample.payload),
      headers: requestExample.headers
    }

    if(this.callback.isHmac) {
      request.secret = {
        secret: this.callback.secret,
        keyId: this.callback.keyId
      }
    }

    this.callbackService.testCallback(request)
      .subscribe(
        it => this.response.update(it),
        (err: BadRequestError) => this.response.updateWithError(err.error)
      )
  }
}
