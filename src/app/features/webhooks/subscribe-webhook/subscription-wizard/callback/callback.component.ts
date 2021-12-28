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

import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {CallbackService} from "../../../service/callback.service";
import {map, mergeMap, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {Application} from "../../../model/application";
import {Callback} from "../../../../../shared/model/callback/callback";
import {ModalService} from "../../../../../shared/service/modal.service";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../../../shared/model/table/column/context-menu-item";
import {CallbackUrlComponent} from "../../../callback-test/callback-url/callback-url.component";
import {Subscription, SubscriptionStatus} from "../../../../../shared/model/subscription";
import {Optional} from "../../../../../shared/model/optional";
import {WizardStep} from "../steps/wizard-step";
import {CallbackWizardStep} from "../steps/callback-wizard-step";
import {WizardStepBaseComponent} from "../steps/wizard-step-base/wizard-step-base.component";

type CallbackContextMenu = ContextMenuItem<Callback, CallbackMenu>

@Component({
  selector: 'app-subscription-wizard-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent extends WizardStepBaseComponent<Callback> implements OnInit {
  @Output("onSelect") onSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild("editCallbackTemplate") editCallbackTemplate!: TemplateRef<any>;
  @Input() subscription?: Subscription
  currentApplication!: Application;
  readonly _selectedCallback: BehaviorSubject<Optional<Callback>> = new BehaviorSubject<Optional<Callback>>(null);

  step: WizardStep<Callback> = new CallbackWizardStep();

  init(value: Optional<Application>): Observable<any> {
    this.currentApplication = value!!
    this._selectedCallback.next(null);
    return super.init(value)
      .pipe(mergeMap(() => this.loadCallbacks()))
      .pipe(tap(it => this._callbacks$.next(it)))
  }

  onNext(): Observable<any> {
    return super.onNext()
      .pipe(map(() => this._selectedCallback.value))
  }

  callbackToEdit?: Callback
  noOfOtherActiveSubscriptions?: number
  subscriptionAlreadyExists: boolean = false

  readonly _callbacks$: BehaviorSubject<Array<Callback>> = new BehaviorSubject<Array<Callback>>([]);

  constructor(
    readonly modalService: ModalService,
    private readonly service: CallbackService
  ) {
    super();
  }

  get selectedCallback() {
    return this._selectedCallback.value
  }

  get encodedSecret(): string {
    return CallbackUrlComponent.ENCODED_SECRET
  }

  get callbackMenuItems(): Array<CallbackContextMenu> {
    return [
      ContextMenuItemBuilder
        .create<Callback, CallbackMenu>(CallbackMenu.EDIT)
        .handler(this.editCallback())
        .build()
    ]
  }

  editCallback(): (it: Callback, item: CallbackContextMenu) => any {
    return (callback: Callback) => {
      this.service.fetchApplicationCallback(this.currentApplication.id, callback.id)
        .pipe(
          tap(it => this.callbackToEdit = it),
          mergeMap(() => this.service.noOfCallbackSubscriptions(this.currentApplication.id, callback.id))
        )
        .subscribe((it: number) => {
          this.noOfOtherActiveSubscriptions = this.subscription?.statusUpdate?.status == SubscriptionStatus.ACTIVATED
            ? it - 1
            : it
          this.modalService.open(this.editCallbackTemplate)
        })
    }
  }

  loadCallbacks(): Observable<Array<Callback>> {
    return this.service.fetchApplicationCallbacks(this.currentApplication)
  }

  ngOnInit(): void {
  }

  create() {
    this.modalService.hide();
  }

  selectCallback(callback: Callback) {
    this._selectedCallback.next(callback)
    this.onSelect.emit(callback)
  }

  callbackIsCreated(callback: Callback) {
    let list = this._callbacks$.value
    this._callbacks$.next(list.concat(...[callback]))
    this.selectCallback(callback);
  }

  callbackIsUpdated(callback: Callback) {
/*
    let list = this._callbacks$.value
    let idx = list.findIndex((it) => it.id == callback.id)
    list[idx] = callback
    this._callbacks$.next(list)
*/
    this.loadCallbacks()
      .subscribe(list => {
        this._callbacks$.next(list);
        this.selectCallback(callback);
      })
  }
}

enum CallbackMenu {
  EDIT = "Edit"
}
