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

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ModalService} from "../../../../shared/service/modal.service";
import {Observable} from "rxjs";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {VerifyCallbackComponent} from "./verify-callback/verify-callback.component";
import {WizardCongratsComponent} from "./congrats/wizard-congrats.component";
import {WizardStepManager} from "./steps/wizard-step.manager";
import {WebhookBaseComponent} from "../../common/webhook-base-component";
import {WebhooksContext} from "../../webhooks-context";
import {WizardStepComponent} from "./steps/wizard-step.component";
import {Optional} from "../../../../shared/model/optional";
import {Subscription} from "../../../../shared/model/subscription";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-subscription-wizard',
  templateUrl: './subscription-wizard.component.html',
  styleUrls: ['./subscription-wizard.component.css']
})
export class SubscriptionWizardComponent extends WebhookBaseComponent implements AfterViewInit {
  @ViewChild('applicationComponent') applicationComponent!: ApplicationComponent
  @ViewChild('callbackComponent') callbackComponent!: CallbackComponent
  @ViewChild('verifyCallbackComponent') verifyCallbackComponent!: VerifyCallbackComponent
  @ViewChild('congratsComponent') congratsComponent!: WizardCongratsComponent

  debug = environment.debug

  stepManager!: WizardStepManager

  constructor(
    private readonly context: WebhooksContext,
    readonly modalService: ModalService
  ) {
    super(context);
  }

  get current(): Optional<WizardStepComponent<any>> {
    return this.stepManager?.currentComponent;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.applicationComponent.init(null);
    this.stepManager = new WizardStepManager([
      this.applicationComponent,
      this.callbackComponent,
      this.verifyCallbackComponent,
      this.congratsComponent,
    ]);
  }

  updateStepValue(value: any) {
    this.stepManager?.updateStepValue(value)
  }

  get stepIsReady$(): Observable<boolean> {
    return this.stepManager?.stepIsReady$;
  }

  prepareForEdit(subscription: Subscription) {
    this.applicationComponent.editing(subscription)
      .pipe(mergeMap((app) => this.stepManager?.moveNext(app)))
      .pipe(mergeMap(() => this.callbackComponent.editing(subscription)))
      .subscribe(() => this.stepManager?.goNext())
  }
}
