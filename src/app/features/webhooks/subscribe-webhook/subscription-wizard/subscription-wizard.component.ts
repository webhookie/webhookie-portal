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
import {ToastService} from "../../../../shared/service/toast.service";
import {WebhooksContext} from "../../webhooks-context";
import {ModalService} from "../../../../shared/service/modal.service";
import {WebhookBaseComponent} from "../../common/webhook-base-component";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import {Optional} from "../../../../shared/model/optional";
import {ResponseComponent} from "../../common/response/response.component";
import {RequestExampleComponent} from "../../common/request-example/request-example.component";
import {Application} from "../../model/application";
import {Callback} from "../../../../shared/model/callback/callback";

@Component({
  selector: 'app-subscription-wizard',
  templateUrl: './subscription-wizard.component.html',
  styleUrls: ['./subscription-wizard.component.css']
})
export class SubscriptionWizardComponent extends WebhookBaseComponent implements AfterViewInit {
  @ViewChild('responseComponent') response?: ResponseComponent
  @ViewChild('requestExampleComponent') requestExampleComponent!: RequestExampleComponent

  readMode = false;
  finished:any=[];
  isRes:boolean=false;
  isTest:boolean=false;
  debug = environment.debug

  steps: Array<WizardStep<any>> = [
    new ApplicationWizardPage("1.Select your application", "bi bi-folder2-open"),
    new CallbackWizardPage("2.Select your callback", "bi bi-link-45deg"),
    new DefaultWizardStep(3, "3.Test callback", "bi bi-gear"),
    new DefaultWizardStep(4, "Congratulations!", "bi bi-snow2")
  ]

  currentStep: WizardStep<any> = this.steps[0];

  private stepMatches(step: number): boolean {
    return this.currentStep.step == step
  }

  get isApplicationStep(): boolean {
    return this.stepMatches(this.steps[0].step)
  }

  get isCallbackStep(): boolean {
    return this.stepMatches(this.steps[1].step)
  }

  get isVerifyCallbackStep(): boolean {
    return this.stepMatches(this.steps[2].step)
  }

  get isCongratsStep(): boolean {
    return this.stepMatches(this.steps[3].step)
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

  constructor(
    private readonly toastService: ToastService,
    private readonly context: WebhooksContext,
    readonly modalService: ModalService
  ) {
    super(context)
  }

  goBack() {
    this.nextPrev(-1)
  }

  goNext() {
    this.nextPrev(1)
  }

  private nextPrev(tab: any){
    if(!this.finished.includes(this.currentStep.step)){
      this.finished.push(this.currentStep.step);
    }
    let newStep = this.currentStep.step + tab
    if((newStep > 0) && (newStep < this.steps.length)) {
      this.currentStep = this.steps[newStep - 1]
    }
  }

  isFinished(tab:WizardStep<any>){
    return this.finished.includes(tab.step);
  }

  isCurrent(tab:WizardStep<any>){
    return this.currentStep.step == tab.step
  }

  goToTab(tab: WizardStep<any>){
    this.currentStep = tab
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
}

abstract class WizardStep<T> {
  protected constructor(
    public title: string,
    public icon: string
  ) {
  }
  abstract step: number;
  abstract valueMapper: (v?: T) => string

  private _value$: BehaviorSubject<Optional<any>> = new BehaviorSubject(null);

  next(value: T) {
    this._value$.next(value);
  }

  isReady$(): Observable<boolean> {
    return this._value$.asObservable()
      .pipe(map(it => it != null))
  }

  get displayValue(): Observable<string> {
    return this._value$.asObservable()
      .pipe(
        filter(it => it != null),
        map(it => this.valueMapper(it))
      )
  }

  get currentValue(): T {
    return this._value$.value
  }
}

abstract class CommonWizardStep<T> extends WizardStep<T> {
  protected constructor(
    public title: string,
    public icon: string
  ) {
    super(title, icon);
  }
}

class DefaultWizardStep extends CommonWizardStep<any> {
  constructor(
    public step: number,
    public title: string,
    public icon: string
  ) {
    super(title, icon);
  }

  valueMapper = (v?: Application): string => v?.name ?? "";
}

class ApplicationWizardPage extends CommonWizardStep<Application> {
  constructor(
    public title: string,
    public icon: string
  ) {
    super(title, icon);
  }

  step = 1
  valueMapper = (v?: Application): string => v?.name ?? "";
}

class CallbackWizardPage extends CommonWizardStep<Callback> {
  constructor(
    public title: string,
    public icon: string
  ) {
    super(title, icon);
  }

  step = 2
  valueMapper = (v?: Callback): string => v?.name ?? "";
}
