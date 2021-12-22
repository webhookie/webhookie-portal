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
import {Application} from "../../model/application";
import {ToastService} from "../../../../shared/service/toast.service";
import {WebhooksContext} from "../../webhooks-context";
import {SubscriptionContext} from "../subscription-context";
import {ModalService} from "../../../../shared/service/modal.service";
import {WebhookBaseComponent} from "../../common/webhook-base-component";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Optional} from "../../../../shared/model/optional";
import {ApplicationComponent} from "./application/application.component";
import {CallbackComponent} from "../callback/callback.component";
import {ResponseComponent} from "../../common/response/response.component";
import {RequestExampleComponent} from "../../common/request-example/request-example.component";

@Component({
  selector: 'app-subscription-wizard',
  templateUrl: './subscription-wizard.component.html',
  styleUrls: ['./subscription-wizard.component.css']
})
export class SubscriptionWizardComponent extends WebhookBaseComponent implements AfterViewInit {
  @ViewChild("applicationComponent") application?: ApplicationComponent
  @ViewChild("callbackComponent") callback?: CallbackComponent
  @ViewChild('responseComponent') response?: ResponseComponent
  @ViewChild('requestExampleComponent') requestExampleComponent!: RequestExampleComponent

  readMode = false;
  currentStep:any = 1;
  finished:any=[];
  isRes:boolean=false;
  isTest:boolean=false;
  debug = environment.debug

  steps: Array<WizardStep> = [
    new CommonWizardStep(1, "1.Select your application", "bi bi-folder2-open"),
    new CommonWizardStep(2, "2.Select your callback", "bi bi-link-45deg"),
    new CommonWizardStep(3, "3.Test callback", "bi bi-gear"),
    new CommonWizardStep(4, "Congratulations!", "bi bi-snow2")
  ]

  constructor(
    private readonly toastService: ToastService,
    private readonly context: WebhooksContext,
    private readonly subscriptionContext: SubscriptionContext,
    readonly modalService: ModalService
  ) {
    super(context)
  }

  nextPrev(tab: any){
    if(!this.finished.includes(this.currentStep)){
      this.finished.push(this.currentStep);
    }
    this.currentStep = this.currentStep + tab
    if(this.currentStep == 0){
      this.currentStep = 1
    }
    if(this.currentStep == 5){
      this.currentStep = 4
    }
  }

  isFinished(tab:WizardStep){
    return this.finished.includes(tab.step);
  }

  isCurrent(tab:WizardStep){
    return this.currentStep == tab.step
  }

  goToTab(tab: WizardStep){
    this.currentStep = tab.step
  }

  selectApp(event:Event) {
    let app:any=event.target;
    let application:Application=app.value;
    this.subscriptionContext.updateApplication(application);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  updateStepValue(value: any) {
    this.steps[this.currentStep - 1].next(value);
  }

  get stepIsReady$(): Observable<boolean> {
    return this.steps[this.currentStep - 1].isReady$()
  }
}

abstract class WizardStep {
  protected constructor(
    public step: number,
    public title: string,
    public icon: string
  ) {
  }
  private _value$: BehaviorSubject<Optional<any>> = new BehaviorSubject(null);

  next(value: any) {
    this._value$.next(value);
  }

  isReady$(): Observable<boolean> {
    return this._value$.asObservable()
      .pipe(map(it => it != null))
  }

  get displayValue(): Observable<string> {
    return this._value$.asObservable()
      .pipe(map(it => `${it}`))
  }
}

class CommonWizardStep extends WizardStep {
  constructor(
    public step: number,
    public title: string,
    public icon: string
  ) {
    super(step, title, icon);
  }
}
