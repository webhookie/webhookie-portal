import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {VariableService} from "../common/variable.service";
import {WebhooksContext} from "../webhooks-context";
import {ResponseComponent} from "../common/response/response.component";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {CallbackService, CallbackValidationRequest} from "../service/callback.service";
import {RequestExampleComponent} from "../common/request-example/request-example.component";

@Component({
  selector: 'app-subscribe-webhook',
  templateUrl: './subscribe-webhook.component.html',
  styleUrls: ['./subscribe-webhook.component.css']
})
export class SubscribeWebhookComponent implements OnInit {

  @ViewChild("applicationComponent") application?: ApplicationComponent
  @ViewChild("callbackComponent") callback?: CallbackComponent
  @ViewChild('responseComponent') response?: ResponseComponent
  @ViewChild('requestExampleComponent') requestComponent?: RequestExampleComponent

  constructor(
    readonly variable: VariableService,
    private modalService: BsModalService,
    private readonly context: WebhooksContext,
    private readonly callbackService: CallbackService
  ) {
  }

  ngOnInit(): void {
    this.context.selectedCallback$
      .subscribe(() => this.response?.invalidate())
  }

  title() {
    return `Subscribe ${this.context.selectedTopic?.name} to Webhook`
  }

  test() {
    this.response?.invalidate()
    let callback = this.context.currentCallback

    let request: CallbackValidationRequest = {
      httpMethod: callback.httpMethod,
      url: callback.url,
      payload: JSON.stringify(this.requestComponent?.jsonobj?.result),
      headers: {
        "Content-Type": ["application/json"],
        "Accept": ["*/*"]
      },
      traceId: "1",
      spanId: "1"
    };

    this.callbackService.testCallback(request)
      .subscribe(it => {
        this.response?.update(it)
      })
  }

  get selectedCallback() {
    return this.context.currentCallback
  }

  get hasResponse() {
    return this.response?.hasResponse
  }

  createSubscription() {

  }
}
