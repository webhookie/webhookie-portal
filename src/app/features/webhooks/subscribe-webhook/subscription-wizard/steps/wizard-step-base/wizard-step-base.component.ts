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

import {Component} from '@angular/core';
import {WizardExtraButton, WizardStepComponent} from "../wizard-step.component";
import {WizardStep} from "../wizard-step";
import {Optional} from "../../../../../../shared/model/optional";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-wizard-step-base',
  template: `works!`
})
export class WizardStepBaseComponent<T> implements WizardStepComponent<T> {
  step!: WizardStep<T>;
  visible: boolean = false;

  leftExtraButtons: Array<WizardExtraButton> = [];

  extraButtons: Array<WizardExtraButton> = [];

  init(value: Optional<any>): Observable<any> {
    this.step.resetValue();
    this.step.setCurrent();
    this.show();
    return of(1);
  }

  onNext(): Observable<any> {
    this.step.setComplete();
    this.hide();
    return of(1);
  }

  onPrev(): void {
    this.hide();
    this.step.resetValue();
  }

  onBack(): void {
    this.show();
  }

  private show(): void {
    this.visible = true;
  }

  private hide(): void {
    this.visible = false;
  }
}
