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

import {Observable} from "rxjs";
import {Optional} from "../../../../../shared/model/optional";
import {WizardExtraButton, WizardStepComponent} from "./wizard-step.component";
import {map, mergeMap, tap} from "rxjs/operators";

export class WizardStepManager {
  goBack() {
    this.currentComponent!.onPrev();
    this.nextPrev(-1);
    this.currentComponent!.onBack();
  }

  goNext() {
    this.moveNext("")
      .subscribe(() => console.warn("Going Next..."))
  }

  moveNext(value: any): Observable<any> {
    let nextComponent = this.components[this.currentComponent!.step.order]
    return this.currentComponent!.onNext()
      .pipe(mergeMap(it => nextComponent.init(it)))
      .pipe(tap(() => this.nextPrev(1)))
      .pipe(map(() => value))
  }

  private nextPrev(tab: any){
    let newStep = this.currentComponent!.step.order + tab
    if((newStep > 0) && (newStep <= this.components.length)) {
      this.currentComponent = this.components[newStep - 1]
    }
  }

  updateStepValue(value: any) {
    this.currentComponent!.step.next(value);
  }

  get stepIsReady$(): Observable<boolean> {
    return this.currentComponent!.step.isReady$();
  }

  components: Array<WizardStepComponent<any>> = []
  currentComponent: Optional<WizardStepComponent<any>> = null;
  ready: boolean = false;

  constructor(params: Array<WizardStepComponent<any>>) {
    this.components = params
    this.currentComponent = this.components[0];

    this.ready = true;
  }

  extraAction(extraButton: WizardExtraButton) {
    extraButton.action(this.currentComponent!)
      .subscribe(() => {
        if(this.currentComponent!.step.canGoNext) {
          this.goNext()
        }
      })
  }

  extraActionDisabled(extraButton: WizardExtraButton): Observable<boolean> {
    return extraButton.disabled(this.currentComponent!)
  }
}
