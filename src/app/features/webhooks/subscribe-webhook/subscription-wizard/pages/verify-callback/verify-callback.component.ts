/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RequestExampleComponent} from "../../../../common/request-example/request-example.component";
import {ResponseComponent} from "../../../../common/response/response.component";
import {SubscriptionService, ValidateSubscriptionRequest} from "../../../../../../shared/service/subscription.service";
import {BadRequestError} from "../../../../../../shared/error/bad-request-error";
import {Optional} from "../../../../../../shared/model/optional";
import {Callback} from "../../../../../../shared/model/callback/callback";
import {VerifyCallbackWizardStep} from "../../steps/verify-callback-wizard-step";
import {WizardStep} from "../../steps/wizard-step";
import {Observable, of} from "rxjs";
import {WizardStepBaseComponent} from "../../steps/wizard-step-base/wizard-step-base.component";
import {Subscription} from "../../../../../../shared/model/subscription";
import {ToastService} from "../../../../../../shared/service/toast.service";
import {WizardExtraButton} from "../../steps/wizard-step.component";
import {map} from "rxjs/operators";
import {Webhook} from "../../../../model/webhook";
import {WebhookApi} from "../../../../model/webhook-api";

@Component({
  selector: 'app-subscription-wizard-verify-callback',
  templateUrl: './verify-callback.component.html',
  styleUrls: ['./verify-callback.component.css']
})
export class VerifyCallbackComponent extends WizardStepBaseComponent<Callback> implements OnInit {
  @Input() webhook!: Webhook
  @Input() webhookApi!: WebhookApi
  @ViewChild('requestExampleComponent') requestExampleComponent!: RequestExampleComponent
  @ViewChild('responseComponent') response!: ResponseComponent
  subscription: Optional<Subscription>

  step: WizardStep<any> = new VerifyCallbackWizardStep();

  extraButtons(): Array<WizardExtraButton> {
    return [
      {
        id: "subscribeBtn",
        title: this.webhookApi.requiresApproval ? "Next" : "Subscribe",
        css: "",

        action(step: VerifyCallbackComponent): Observable<any> {
          if(step.webhookApi.requiresApproval) {
            return of(1)
          }

          return step.subscriptionService.activateSubscription(step.subscription!)
        },

        disabled(step: VerifyCallbackComponent): Observable<boolean> {
          return of(!step.testPassed)
        }
      }
    ]
  }

  init(value: Optional<Subscription>): Observable<any> {
    this.subscription = value
    this.inProgress = false
    this.testResult = TestResult.UNKNOWN
    return super.init(value)
  }

  onNext(): Observable<Optional<Subscription>> {
    return super.onNext()
      .pipe(map(() => this.subscription))
  }

  inProgress: boolean = false
  testResult: TestResult = TestResult.UNKNOWN

  constructor(
    private readonly toastService: ToastService,
    private readonly subscriptionService: SubscriptionService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  get showResponse(): boolean {
    return this.inProgress || this.hasResponse;
  }

  get hasResponse(): boolean {
    return this.testResult != TestResult.UNKNOWN
  }

  get testFailed(): boolean {
    return this.testResult == TestResult.FAILED
  }

  get testPassed(): boolean {
    return this.testResult == TestResult.PASSED
  }

  validate() {
    this.inProgress = true;
    this.response.init()

    let requestExample: ValidateSubscriptionRequest = this.requestExampleComponent.valueEx();
    let request = {
      payload: JSON.stringify(requestExample.payload),
      headers: requestExample.headers
    }

    this.subscriptionService.validateSubscription(this.subscription!, request)
      .subscribe(
        it => this.updateWithSuccess(it),
        (it: BadRequestError) => this.updateWithError(it)
      )
  }

  update() {
    this.inProgress = false;
  }

  updateWithSuccess(result: any) {
    this.testResult = TestResult.PASSED
    this.update();
    this.response.update(result)
    this.step.setComplete();
  }

  updateWithError(error: BadRequestError) {
    this.testResult = TestResult.FAILED
    this.update();
    this.response.updateWithError(error.error)
  }
}

enum TestResult {
  UNKNOWN,
  FAILED,
  PASSED
}
