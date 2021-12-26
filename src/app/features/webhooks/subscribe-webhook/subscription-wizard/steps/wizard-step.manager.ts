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

import {Injectable} from '@angular/core';
import {WizardStep} from "./wizard-step";
import {ApplicationWizardPage} from "./application-wizard-step";
import {CallbackWizardPage} from "./callback-wizard-step";
import {DefaultWizardStep} from "./default-wizard-step";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WizardStepManager {
  private stepMatches(step: number): boolean {
    return this.currentStep.step == step
  }

  get isApplicationStep(): boolean {
    return this.stepMatches(this.APPLICATION_STEP.step)
  }

  get isCallbackStep(): boolean {
    return this.stepMatches(this.CALLBACK_STEP.step)
  }

  get isVerifyCallbackStep(): boolean {
    return this.stepMatches(this.VERIFY_STEP.step)
  }

  get isCongratsStep(): boolean {
    return this.stepMatches(this.CONGRATS_STEP.step)
  }

  get isFirstStep(): boolean {
    return this.currentStep.step == 1
  }

  get isFinalStep(): boolean {
    return this.currentStep.step == this.steps.length
  }

  get isCancellable(): boolean {
    return !this.isFinalStep
  }

  get canGoBack(): boolean {
    return !(this.isFirstStep || this.isFinalStep)
  }

  get canGoNext(): boolean {
    return this.currentStep.step < 3
  }

  get canSubscribe(): boolean {
    return this.currentStep.step == 3
  }

  goBack() {
    if(this.finished.has(this.currentStep.step)){
      this.finished.delete(this.currentStep.step);
    }
    this.currentStep.resetValue();
    this.nextPrev(-1)
  }

  goNext() {
    if(!this.finished.has(this.currentStep.step)){
      this.finished.add(this.currentStep.step);
    }
    this.nextPrev(1)
  }

  private nextPrev(tab: any){
    let newStep = this.currentStep.step + tab
    if((newStep > 0) && (newStep <= this.steps.length)) {
      this.currentStep = this.steps[newStep - 1]
    }
  }

  isFinished(tab: WizardStep<any>) {
    return this.finished.has(tab.step);
  }

  isCurrent(tab: WizardStep<any>) {
    return this.currentStep.step == tab.step
  }

  goToTab(tab: WizardStep<any>){
    this.currentStep = tab
  }

  updateStepValue(value: any) {
    this.currentStep.next(value);
  }

  stepValue(step: number): any {
    return this.steps[step - 1].currentValue;
  }

  get stepIsReady$(): Observable<boolean> {
    return this.currentStep.isReady$();
  }

  finished: Set<number> = new Set<number>();

  private APPLICATION_STEP = new ApplicationWizardPage("1.Select your application", "bi bi-folder2-open");
  private CALLBACK_STEP = new CallbackWizardPage("2.Select your callback", "bi bi-link-45deg");
  private VERIFY_STEP = new DefaultWizardStep(3, "3.Test callback", "bi bi-gear");
  private CONGRATS_STEP = new DefaultWizardStep(4, "Congratulations!", "bi bi-snow2");

  steps: Array<WizardStep<any>> = [
    this.APPLICATION_STEP,
    this.CALLBACK_STEP,
    this.VERIFY_STEP,
    this.CONGRATS_STEP
  ]

  currentStep: WizardStep<any> = this.APPLICATION_STEP;

  constructor() { }
}
