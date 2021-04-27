import {Component, OnInit, ViewChild} from '@angular/core';
import {WebhooksContext} from "../webhooks-context";
import {ResponseComponent} from "../common/response/response.component";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {mergeMap} from "rxjs/operators";
import {SubscriptionService, ValidateSubscriptionRequest} from "../../../shared/service/subscription.service";
import {Observable} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";
import {RouterService} from "../../../shared/service/router.service";
import {HttpHeaders} from "@angular/common/http";
import {CallbackResponse} from "../service/callback.service";
import {BadRequestError} from "../../../shared/error/bad-request-error";
import {Pageable} from "../../../shared/request/pageable";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {Constants} from "../../../shared/constants";

@Component({
  selector: 'app-subscribe-webhook',
  templateUrl: './subscribe-webhook.component.html',
  styleUrls: ['./subscribe-webhook.component.css']
})
export class SubscribeWebhookComponent implements OnInit {

  @ViewChild("applicationComponent") application?: ApplicationComponent
  @ViewChild("callbackComponent") callback?: CallbackComponent
  @ViewChild('responseComponent') response?: ResponseComponent
  @ViewChild('requestExampleComponent') requestExampleComponent?: RequestExampleComponent

  subscription?: Subscription

  constructor(
    private readonly context: WebhooksContext,
    private readonly subscriptionService: SubscriptionService,
    private readonly routeService: RouterService
  ) {
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

  private clear() {
    this.context.clear();
  }

  private clearSubscription() {
    // @ts-ignore
    this.subscription = null;
  }

  ngOnInit(): void {
    this.clear();

    this.context.callbackCleared$
    // @ts-ignore
      .subscribe(() => this.clearSubscription());

    this.context._createdCallback$.asObservable()
    // @ts-ignore
      .subscribe(() => this.clearSubscription())

    this.context.selectedCallback$
      .pipe(mergeMap(it => this.fetchSubscriptions(it.callbackId)))
      .subscribe(it => {
        if (it.length > 0) {
          this.subscription = it[0]
        } else {
          this.clearSubscription();
        }
        this.response?.invalidate()
      })
  }

  title() {
    return `Subscribe ${this.context.selectedTopic?.name} to Webhook`
  }

  validate() {
    let validateSubscription = (): Observable<Subscription> => {
      let request: ValidateSubscriptionRequest = {
        payload: JSON.stringify(this.requestExampleComponent?.request.jsonobj),
        headers: {
          "Content-Type": ["application/json"],
          "Accept": ["*/*"]
        }
      };
      // @ts-ignore
      return this.subscriptionService.validateSubscription(this.subscription, request)
    };

    let successHandler = (it: Subscription) => {
      this.response?.update(new CallbackResponse(
        200, new HttpHeaders(), ""
      ))
      this.subscription = it;
    };

    let errorHandler = (err: BadRequestError) => this.response?.updateWithError(err.error);

    this.context.selectedCallback$
      .pipe(mergeMap(validateSubscription))
      .subscribe(successHandler, errorHandler)
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

  createSubscription() {
    this.subscriptionService.createSubscription(this.context.selectedTopic?.name, this.selectedCallback.callbackId)
      .subscribe(it => this.subscription = it);
  }

  private fetchSubscriptions(callbackId: string): Observable<Array<Subscription>> {
    let filter = {
      role: Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER,
      topic: this.context.selectedTopic?.name,
      callbackId: callbackId
    }
    return this.subscriptionService.fetchSubscriptions(filter, Pageable.default())
  }
}
