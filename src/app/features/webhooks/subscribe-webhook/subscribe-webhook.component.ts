import {Component, OnInit, ViewChild} from '@angular/core';
import {WebhooksContext} from "../webhooks-context";
import {ResponseComponent} from "../common/response/response.component";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {mergeMap} from "rxjs/operators";
import {SubscriptionService, ValidateSubscriptionRequest} from "../../../shared/subscription.service";
import {Observable} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";
import {RouterService} from "../../../shared/router.service";

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
    private readonly routeService: RouterService
  ) {
  }

  private fetchSubscriptions(callbackId: string): Observable<Array<Subscription>> {
    return this.subscriptionService.fetchSubscriptions("CONSUMER", this.context.selectedTopic?.name, callbackId)
  }

  ngOnInit(): void {
    this.context.selectedCallback$
      .pipe(mergeMap(it => this.fetchSubscriptions(it.callbackId)))
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

  validate() {
    this.context.selectedCallback$
      .pipe(
        mergeMap(() => {
          let request: ValidateSubscriptionRequest = {
            payload: JSON.stringify(this.requestComponent?.jsonobj?.result),
            headers: {
              "Content-Type": ["application/json"],
              "Accept": ["*/*"]
            }
          };
          // @ts-ignore
          return this.subscriptionService.validateSubscription(this.subscription, request)
        })
      )
      .subscribe(it => this.subscription = it)
      // .subscribe(it => {
      //   this.response?.update(it)
      // })
  }

  activate() {
    // @ts-ignore
    this.subscriptionService.activateSubscription(this.subscription)
      .subscribe(it => {
        this.subscription = it;
        setTimeout(() => {
          this.routeService.navigateTo("/webhooks/congrats")
        }, 2000);
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

  get canBeActivated() {
    return this.subscription?.canBeActivated()
  }

  get hasResponse() {
    return this.response?.hasResponse
  }

  createSubscription() {
    this.subscriptionService.createSubscription(this.context.selectedTopic?.name, this.selectedCallback.callbackId)
      .subscribe(it => this.subscription = it);
  }
}
