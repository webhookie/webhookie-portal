import {Component, ViewChild} from '@angular/core';
import {WebhooksContext} from "../webhooks-context";
import {ResponseComponent} from "../common/response/response.component";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {filter, mergeMap} from "rxjs/operators";
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
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriptionContext} from "./subscription-context";
import {WebhookBaseComponent} from "../common/webhook-base-component";
import {environment} from "../../../../environments/environment";
import {WebhookieError} from "../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../shared/error/duplicate-entity-error";
import {ToastService} from "../../../shared/service/toast.service";

@Component({
  selector: 'app-subscribe-webhook',
  templateUrl: './subscribe-webhook.component.html',
  styleUrls: ['./subscribe-webhook.component.css']
})
export class SubscribeWebhookComponent extends WebhookBaseComponent{

  @ViewChild("applicationComponent") application?: ApplicationComponent
  @ViewChild("callbackComponent") callback?: CallbackComponent
  @ViewChild('responseComponent') response?: ResponseComponent
  @ViewChild('requestExampleComponent') requestExampleComponent!: RequestExampleComponent

  subscription?: Subscription
  readMode = false;
  isRunning = false;

  debug = environment.debug

  constructor(
    private readonly toastService: ToastService,
    private readonly context: WebhooksContext,
    private readonly subscriptionContext: SubscriptionContext,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService,
    private readonly routeService: RouterService
  ) {
    super(context)
  }

  get selectedCallback() {
    return this.subscriptionContext.currentCallback
  }

  get selectedSubscription() {
    return this.subscription
  }

  get canBeSaved() {
    return this.selectedCallback && !this.selectedSubscription
  }

  get canBeValidated() {
    return this.subscription?.canBeValidated() && !this.isRunning
  }

  get canBeActivated() {
    return this.subscription?.canBeActivated()
  }

  get hasResponse() {
    return this.response?.hasResponse
  }

  private clear() {
    this.subscriptionContext.clear();
  }

/*
  private clearSubscription() {
    this.subscription = null;
  }
*/

  // noinspection JSUnusedGlobalSymbols
  ngAfterViewInit() {
    this.activatedRoute.queryParams
      .pipe(
        filter(it => it.subscriptionId != null),
        mergeMap(it => this.subscriptionService.fetchSubscription(it.subscriptionId))
      )
      .subscribe(it => {
        this.readMode = true
        this.subscription = it;
      });
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.clear();

/*
    this.subscriptionContext.callbackCleared$
      .subscribe(() => this.clearSubscription());

    this.subscriptionContext._createdCallback$.asObservable()
      .subscribe(() => this.clearSubscription())
*/

    this.subscriptionContext.selectedCallback$
      // .pipe(mergeMap(it => this.fetchSubscriptions(it.id)))
      .subscribe(it => {
/*
        if (it.length > 0) {
          this.subscription = it[0]
        } else {
          this.clearSubscription();
        }
*/
        this.response?.invalidate()
      })
  }

  title() {
    return `Subscribe to ${this.webhook.topic.name} webhook`
  }

  validate() {
    let validateSubscription = (): Observable<Subscription> => {
      this.isRunning = true;
      this.response?.init();
      let requestExample: ValidateSubscriptionRequest = this.requestExampleComponent.valueEx();
      let request = {
        payload: JSON.stringify(requestExample.payload),
        headers: requestExample.headers
      }

      return this.subscriptionService.validateSubscription(this.subscription!, request)
    };

    let successHandler = (it: Subscription) => {
      this.response?.update(new CallbackResponse(
        200, new HttpHeaders(), ""
      ))
      this.isRunning = false;
      this.subscription = it;
    };

    let errorHandler = (err: BadRequestError) => {
      this.isRunning = false;
      this.response?.updateWithError(err.error);
    }

    this.subscriptionContext.selectedCallback$
      .pipe(mergeMap(validateSubscription))
      .subscribe(successHandler, errorHandler)
  }

  activate() {
    // @ts-ignore
    this.subscriptionService.activateSubscription(this.subscription)
      .subscribe(it => {
        this.subscription = it;
        this.routeService.navigateTo("/webhooks/congrats");
      })
  }

  createSubscription() {
    let successHandler = (it: Subscription) => {
      this.subscription = it
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        message = `There is a subscription with the selected Callback and Application for ${this.webhook.topic.name}`
      }
      this.toastService.error(message, "Server Error")
    };

    this.subscriptionService.createSubscription(this.webhook.topic.name, this.selectedCallback!.id)
      .subscribe(successHandler, errorHandler);
  }

  private fetchSubscriptions(callbackId: string): Observable<Array<Subscription>> {
    let filter = {
      role: Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER,
      topic: this.webhook.topic.name,
      callbackId: callbackId
    }
    return this.subscriptionService.fetchSubscriptions(filter, Pageable.default())
  }
}
