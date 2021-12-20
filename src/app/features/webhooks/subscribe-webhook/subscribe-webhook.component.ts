/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {WebhooksContext} from "../webhooks-context";
import {ResponseComponent} from "../common/response/response.component";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {filter, mergeMap} from "rxjs/operators";
import {SubscriptionService, ValidateSubscriptionRequest} from "../../../shared/service/subscription.service";
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";
import {RouterService} from "../../../shared/service/router.service";
import {HttpHeaders} from "@angular/common/http";
import {BadRequestError} from "../../../shared/error/bad-request-error";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriptionContext} from "./subscription-context";
import {WebhookBaseComponent} from "../common/webhook-base-component";
import {environment} from "../../../../environments/environment";
import {WebhookieError} from "../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../shared/error/duplicate-entity-error";
import {ToastService} from "../../../shared/service/toast.service";
import {CallbackResponse} from "../../../shared/model/callback/callback-response";
import { Application } from '../model/application';
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-subscribe-webhook',
  templateUrl: './subscribe-webhook.component.html',
  styleUrls: ['./subscribe-webhook.component.css']
})
export class SubscribeWebhookComponent extends WebhookBaseComponent implements AfterViewInit {

  @ViewChild("applicationComponent") application?: ApplicationComponent
  @ViewChild("callbackComponent") callback?: CallbackComponent
  @ViewChild('responseComponent') response?: ResponseComponent
  @ViewChild('requestExampleComponent') requestExampleComponent!: RequestExampleComponent

  readonly _applications$: Subject<Array<Application>> = new ReplaySubject();
  subscription?: Subscription
  readMode = false;
  isRunning = false;
  currenttab:any = 1;
  finished:any=[];
  isRes:boolean=false;
  isTest:boolean=false;
  debug = environment.debug

  constructor(
    private readonly toastService: ToastService,
    private readonly context: WebhooksContext,
    private readonly subscriptionContext: SubscriptionContext,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService,
    private readonly routeService: RouterService,
    private readonly modalService: ModalService
  ) {
    super(context)
    this.finished.push(this.currenttab);
  }

  get selectedCallback() {
    return this.subscriptionContext.currentCallback
  }

  get canBeSaved() {
    return this.selectedCallback &&
      this.subscription?.callback?.id != this.selectedCallback.id
  }

  get canBeValidated() {
    return this.subscription?.canBeValidated() && !this.isRunning  && !this.canBeSaved
  }

  get canBeActivated() {
    return this.subscription?.canBeActivated() && !this.canBeSaved
  }

  get hasResponse() {
    return this.response?.hasResponse
  }

  private clear() {
    this.subscriptionContext.clear();
  }

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

    this.subscriptionContext.selectedCallback$
      .subscribe(() => this.response?.invalidate());
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

    validateSubscription()
      .subscribe(successHandler, errorHandler)
  }

  activate() {
    this.subscriptionService.activateSubscription(this.subscription!)
      .subscribe(it => {
        this.subscription = it;
        this.routeService.navigateTo("/webhooks/congrats");
      })
  }

  createSubscription() {
    let successHandler = (it: Subscription) => {
      this.subscription = it
      this.toastService.success(`subscription has been saved successfully!`, "Done")
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        message = `There is a subscription with the selected Callback and Application for ${this.webhook.topic.name}`
      }
      this.toastService.error(message, "Server Error")
    };

    if(this.subscription?.id) {
      this.subscriptionService.updateSubscription(this.subscription, this.selectedCallback!.id)
        .subscribe(successHandler, errorHandler);
    } else {
      this.subscriptionService.createSubscription(this.webhook.topic.name, this.selectedCallback!.id)
        .subscribe(successHandler, errorHandler);
    }
  }
  nextPrev(tab: any){
    if(!this.finished.includes(this.currenttab)){
      this.finished.push(this.currenttab);
    }
  	this.currenttab = this.currenttab + tab
  	if(this.currenttab == 0){
  		this.currenttab = 1
  	}
  	if(this.currenttab == 5){
  		this.currenttab = 4
  	}
  }
  isFinished(tab:any){
    return this.finished.includes(tab);
  }
  goToTab(tab: any){
    this.currenttab = tab
  }
  selectApp(event:Event) {
    let app:any=event.target;
    let application:Application=app.value;
    this.subscriptionContext.updateApplication(application);
  }
  get selectedApplication() {
    return this.subscriptionContext.currentApplication
  }
}
