import {Component, OnInit, ViewChild} from '@angular/core';
import {WebhooksContext} from "../webhooks-context";
import {ResponseComponent} from "../common/response/response.component";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {CallbackService, CallbackValidationRequest} from "../service/callback.service";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {mergeMap} from "rxjs/operators";
import {SubscriptionService} from "../../../shared/subscription.service";
import {Observable} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";

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

  subscription?: Subscription

  constructor(
    private readonly context: WebhooksContext,
    private readonly subscriptionService: SubscriptionService,
    private readonly callbackService: CallbackService
  ) {
  }

  private fetchSubscriptions(callbackId: string): Observable<Array<Subscription>> {
    return this.subscriptionService.fetchSubscriptions("CONSUMER", this.context.selectedTopic?.name, callbackId)
  }

  ngOnInit(): void {
    this.context.selectedCallback$
      .pipe(
        mergeMap(it => this.fetchSubscriptions(it.callbackId))
      )
      .subscribe(it => {
        if(it.length > 0) {
          this.subscription = it[0]
        }
        this.response?.invalidate()
      })
  }

  title() {
    return `Subscribe ${this.context.selectedTopic?.name} to Webhook`
  }

  test() {
    this.response?.invalidate()
    this.context.selectedCallback$
      .pipe(
        mergeMap(it => {
          let request: CallbackValidationRequest = {
            httpMethod: it.httpMethod,
            url: it.url,
            payload: JSON.stringify(this.requestComponent?.jsonobj?.result),
            headers: {
              "Content-Type": ["application/json"],
              "Accept": ["*/*"]
            },
            traceId: "1",
            spanId: "1"
          };

          return this.callbackService.testCallback(request)
        })
      )
      .subscribe(it => {
        this.response?.update(it)
      })
  }

  get selectedCallback() {
    return this.context.currentCallback
  }

  get selectedSubscription() {
    return this.subscription
  }

  get canBeSaved() {
    return this.selectedCallback && !this.selectedSubscription
  }

  get canBeValidated() {
    return this.subscription?.canBeValidated()
  }

  get hasResponse() {
    return this.response?.hasResponse
  }

  createSubscription() {

  }
}
