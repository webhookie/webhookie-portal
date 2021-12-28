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
import {environment} from "../../../../../environments/environment";
import {ModalService} from "../../../../shared/service/modal.service";
import {Observable} from "rxjs";
import {WizardStepManager} from "./steps/wizard-step.manager";
import {Optional} from "../../../../shared/model/optional";
import {Application} from "../../model/application";
import {Callback} from "../../../../shared/model/callback/callback";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "./callback/callback.component";
import {VerifyCallbackComponent} from "./verify-callback/verify-callback.component";
import {WizardCongratsComponent} from "./congrats/wizard-congrats.component";

@Component({
  selector: 'app-subscription-wizard',
  templateUrl: './subscription-wizard.component.html',
  styleUrls: ['./subscription-wizard.component.css']
})
export class SubscriptionWizardComponent implements AfterViewInit {
  @ViewChild('applicationComponent') applicationComponent!: ApplicationComponent
  @ViewChild('callbackComponent') callbackComponent!: CallbackComponent
  @ViewChild('verifyCallbackComponent') verifyCallbackComponent!: VerifyCallbackComponent
  @ViewChild('congratsComponent') congratsComponent!: WizardCongratsComponent

  debug = environment.debug

  constructor(
    readonly stepManager: WizardStepManager,
    readonly modalService: ModalService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.stepManager.init([
      this.applicationComponent,
      this.callbackComponent,
      this.verifyCallbackComponent,
      this.congratsComponent,
    ])
  }

  get selectedApplication(): Optional<Application> {
    return this.stepValue(1)
  }

  get selectedCallback(): Optional<Callback> {
    return this.stepValue(2)
  }

  updateStepValue(value: any) {
    this.stepManager.updateStepValue(value)
  }

  private stepValue(step: number): any {
    return this.stepManager.stepValue(step)
  }

  get stepIsReady$(): Observable<boolean> {
    return this.stepManager.stepIsReady$;
  }
}
