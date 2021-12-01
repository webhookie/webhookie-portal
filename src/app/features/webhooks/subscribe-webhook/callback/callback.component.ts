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

import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CallbackService} from "../../service/callback.service";
import {mergeMap, tap} from "rxjs/operators";
import {EMPTY, Observable, of, ReplaySubject, Subject, zip} from "rxjs";
import {Application} from "../../model/application";
import {Callback} from "../../../../shared/model/callback/callback";
import {ModalService} from "../../../../shared/service/modal.service";
import {SubscriptionContext} from "../subscription-context";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../../shared/model/table/column/context-menu-item";
import {CallbackUrlComponent} from "../../callback-test/callback-url/callback-url.component";
import {Subscription, SubscriptionStatus} from "../../../../shared/model/subscription";

type CallbackContextMenu = ContextMenuItem<Callback, CallbackMenu>

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  @ViewChild("editCallbackTemplate") editCallbackTemplate!: TemplateRef<any>;
  @Input() subscription?: Subscription

  callbackToEdit?: Callback
  noOfOtherActiveSubscriptions?: number

  readonly _callbacks$: Subject<Array<Callback>> = new ReplaySubject();

  constructor(
    readonly modalService: ModalService,
    private readonly context: SubscriptionContext,
    private readonly service: CallbackService
  ) {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  get selectedCallback() {
    return this.context.currentCallback
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
      this.service.fetchApplicationCallback(this.selectedApplication!.id, callback.id)
        .pipe(
          tap(it => this.callbackToEdit = it),
          mergeMap(() => this.service.noOfCallbackSubscriptions(this.selectedApplication!.id, callback.id))
        )
        .subscribe((it: number) => {
          this.noOfOtherActiveSubscriptions = this.subscription?.statusUpdate?.status == SubscriptionStatus.ACTIVATED
            ? it - 1
            : it
          this.modalService.open(this.editCallbackTemplate)
        })
    }
  }

  loadCallbacks(application?: Application): Observable<Array<Callback>> {
    if(application) {
      return this.service.fetchApplicationCallbacks(application)
    }

    return EMPTY;
  }

  ngOnInit(): void {
    this.context.selectedApplication$
      .pipe(mergeMap(it => this.service.fetchApplicationCallbacks(it)))
      .subscribe(list => {
        this._callbacks$.next(list);
        if(this.context.currentCallbackId) {
          const callback = list.filter(it => it.id == this.context.currentCallbackId)[0]
          this.selectCallback(callback)
        }
      })

    this.context._createdCallback$.asObservable()
      .pipe(
        mergeMap(it => zip(of(it), this.loadCallbacks(this.selectedApplication)))
      )
      .subscribe(it => {
        this._callbacks$.next(it[1]);
        this.selectCallback(it[0]);
      })
  }

  create() {
    this.modalService.hide();
  }

  selectCallback(callback: Callback) {
    this.context.updateCallback(callback);
  }
}

enum CallbackMenu {
  EDIT = "Edit"
}
