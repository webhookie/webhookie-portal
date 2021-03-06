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

import {Component, OnInit} from '@angular/core';
import {WizardStepBaseComponent} from "../../steps/wizard-step-base/wizard-step-base.component";
import {WizardStep} from "../../steps/wizard-step";
import {WizardExtraButton} from "../../steps/wizard-step.component";
import {ApprovalDetailsWizardStep} from "../../steps/approval-details-wizard-step";
import {Optional} from "../../../../../../shared/model/optional";
import {Subscription} from "../../../../../../shared/model/subscription";
import {Observable, of} from "rxjs";
import {ToastService} from "../../../../../../shared/service/toast.service";
import {SubscriptionService} from "../../../../../../shared/service/subscription.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {RouterService} from "../../../../../../shared/service/router.service";
import {ProfileService} from "../../../../../../shared/service/profile.service";

@Component({
  selector: 'app-subscription-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css']
})
export class ApprovalDetailsComponent extends WizardStepBaseComponent<any> implements OnInit {
  subscription: Optional<Subscription>
  step: WizardStep<any> = new ApprovalDetailsWizardStep();

  submitForm!: FormGroup

  extraButtons(): Array<WizardExtraButton> {
    if(this.step.completed) {
      return [
        {
          id: "managesub",
          title: "Manage your subscription",
          css: "ml-2",

          action(step: ApprovalDetailsComponent): Observable<any> {
            step.routerService.navigateToConsumerSubscriptions()
            return of(1)
          },

          disabled(_: ApprovalDetailsComponent): Observable<boolean> {
            return of(false)
          }
        },
        {
          id: "gohome",
          title: "Go to webhooks page",
          css: "ml-2 btn btn-default",

          action(step: ApprovalDetailsComponent): Observable<any> {
            step.routerService.navigateToWebhooks()
            return of(1)
          },

          disabled(_: ApprovalDetailsComponent): Observable<boolean> {
            return of(false)
          }
        }
      ]
    }

    return [
      {
        id: "submitForApprovalBtn",
        title: "Submit for approval",
        css: "",

        action(step: ApprovalDetailsComponent): Observable<any> {
          return step.submitForApproval()
        },

        disabled(step: ApprovalDetailsComponent): Observable<boolean> {
          return of(step.canBeSubmitted)
        }
      }
    ]
  }

  get canBeSubmitted(): boolean {
    return !this.submitForm.dirty || (this.submitForm.dirty && !this.submitForm.valid)
  }

  submitForApproval(): Observable<Subscription> {
    return this.subscriptionService.submitForApproval(this.subscription!.id, this.reason.value)
      .pipe(tap(() => this.step.setComplete()))
  }

  init(value: Optional<Subscription>): Observable<any> {
    this.subscription = value
    return super.init(value)
  }

  constructor(
    private readonly toastService: ToastService,
    private readonly profileService: ProfileService,
    private readonly routerService: RouterService,
    private readonly subscriptionService: SubscriptionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      reason: new FormControl("", [
        Validators.required
      ])
    });
  }

  get reason(): AbstractControl { return this.submitForm.get('reason')!; }
}
