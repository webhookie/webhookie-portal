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
import {Observable} from "rxjs";
import {Optional} from "../../../../../shared/model/optional";
import {WizardStepComponent} from "./wizard-step.component";

@Injectable({
  providedIn: 'root'
})
export class WizardStepManager {
  get isFirstStep(): boolean {
    if(this.ready) {
      return this.currentComponent!.step.order == 1
    }

    return false
  }

  get isFinalStep(): boolean {
    if(this.ready) {
      return this.currentComponent!.step.order == this.components.length
    }

    return false;
  }

  get isCancellable(): boolean {
    return !this.isFinalStep
  }

  get canGoBack(): boolean {
    return !(this.isFirstStep || this.isFinalStep)
  }

  get canGoNext(): boolean {
    if(this.ready) {
      return this.currentComponent!.step.order < 3
    }

    return false;
  }

  get canSubscribe(): boolean {
    if(this.ready) {
      return this.currentComponent!.step.order == 3
    }

    return false;
  }

  goBack() {
    if(this.finished.has(this.currentComponent!.step.order)){
      this.finished.delete(this.currentComponent!.step.order);
    }
    this.currentComponent!.step.resetValue();
    this.nextPrev(-1)
  }

  goNext() {
    if(!this.finished.has(this.currentComponent!.step.order)){
      this.finished.add(this.currentComponent!.step.order);
    }
    this.nextPrev(1)
  }

  private nextPrev(tab: any){
    this.components[this.currentComponent!.step.order - 1].visible = false
    let newStep = this.currentComponent!.step.order + tab
    if((newStep > 0) && (newStep <= this.components.length)) {
      this.currentComponent = this.components[newStep - 1]
    }
    this.components[this.currentComponent!.step.order - 1].visible = true
  }

  isFinished(tab: WizardStepComponent<any>) {
    return this.finished.has(tab.step.order);
  }

  isCurrent(tab: WizardStepComponent<any>) {
    return this.currentComponent!.step.order == tab.step.order
  }

  goToTab(tab: WizardStepComponent<any>){
    this.currentComponent = tab
  }

  updateStepValue(value: any) {
    this.currentComponent!.step.next(value);
  }

  stepValue(step: number): any {
    if(this.ready) {
      return this.components[step - 1].step.currentValue;
    }
    return ""
  }

  get stepIsReady$(): Observable<boolean> {
    return this.currentComponent!.step.isReady$();
  }

  finished: Set<number> = new Set<number>();

  components: Array<WizardStepComponent<any>> = []
  currentComponent: Optional<WizardStepComponent<any>> = null;
  ready: boolean = false;

  constructor() { }

  init(param: Array<WizardStepComponent<any>>) {
    this.components = param
    this.currentComponent = this.components[0];

    this.ready = true;
  }
}
