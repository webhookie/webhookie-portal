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

import {Component, OnInit, Input} from '@angular/core';
import {WizardStep} from "../../steps/wizard-step";
import {CongratsWizardStep} from "../../steps/congrats-wizard-step";
import {WizardStepBaseComponent} from "../../steps/wizard-step-base/wizard-step-base.component";
import {WizardExtraButton} from "../../steps/wizard-step.component";
import {Observable, of} from "rxjs";
import {Optional} from "../../../../../../shared/model/optional";
import {RouterService} from "../../../../../../shared/service/router.service";
import {tap} from "rxjs/operators";
import {ToastService} from "../../../../../../shared/service/toast.service";
import {SubscriptionService} from "../../../../../../shared/service/subscription.service";
import {Subscription} from "../../../../../../shared/model/subscription";

@Component({
  selector: 'app-subscription-wizard-congrats',
  templateUrl: './wizard-congrats.component.html',
  styleUrls: ['./wizard-congrats.component.css']
})
export class WizardCongratsComponent extends WizardStepBaseComponent<any> implements OnInit {
  @Input() visible:boolean=false;
  subscription: Optional<Subscription>

  step: WizardStep<any> = new CongratsWizardStep();

  leftExtraButtons: Array<WizardExtraButton> = [
  ];

  extraButtons(): Array<WizardExtraButton> {
    return [
      {
        id: "managesub",
        title: "Manage your subscription",
        css: "ml-2",

        action(step: WizardCongratsComponent): Observable<any> {
          step.routerService.navigateToConsumerSubscriptions()
          return of(1)
        },

        disabled(_: WizardCongratsComponent): Observable<boolean> {
          return of(false)
        }
      },
      {
        id: "gohome",
        title: "Go to webhooks page",
        css: "ml-2 btn btn-default",

        action(step: WizardCongratsComponent): Observable<any> {
          step.routerService.navigateToWebhooks()
          return of(1)
        },

        disabled(_: WizardCongratsComponent): Observable<boolean> {
          return of(false)
        }
      }
    ]
  }

  init(value: Optional<Subscription>): Observable<any> {
    this.subscription = value
    return super.init(value)
      .pipe(tap(() => this.step.setComplete()))
  }

  constructor(
    private readonly toastService: ToastService,
    private readonly subscriptionService: SubscriptionService,
    private readonly routerService: RouterService
  ) {
    super();
  }

  ngOnInit(): void {
  }
}
