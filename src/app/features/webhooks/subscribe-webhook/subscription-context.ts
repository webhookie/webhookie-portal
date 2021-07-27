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

import {Application} from "../model/application";
import {Callback} from "../../../shared/model/callback";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {Subscription} from "../../../shared/model/subscription";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionContext {
  private readonly _selectedApplication$: BehaviorSubject<Application|undefined> = new BehaviorSubject<Application|undefined>(undefined);
  // @ts-ignore
  readonly selectedApplication$: Observable<Application> = this._selectedApplication$.asObservable()
    .pipe(filter(it => it != undefined));
  // @ts-ignore
  readonly applicationCleared$: Observable<Application> = this._selectedApplication$.asObservable()
    .pipe(filter(it => it == undefined));

  // @ts-ignore
  private readonly _selectedCallback$: BehaviorSubject<Callback|undefined> = new BehaviorSubject<Callback>(undefined);
  readonly selectedCallback$: Observable<Callback> = this._selectedCallback$.asObservable()
    .pipe(
  // @ts-ignore
      filter(it => it != undefined),
      distinctUntilChanged((x, y) => x.id == y.id),
    );
  // @ts-ignore
  readonly callbackCleared$: Observable<Callback> = this._selectedCallback$
    .asObservable()
    .pipe(filter(it => it == undefined));

  readonly _createdApplication$: Subject<Application> = new ReplaySubject<Application>();

  readonly _createdCallback$: Subject<Callback> = new ReplaySubject<Callback>();

  get currentApplication() {
    return this._selectedApplication$.value
  }

  get currentCallback() {
    return this._selectedCallback$.value
  }

  currentApplicationId?: string;
  currentCallbackId?: string;
  selectSubscription(value: Subscription) {
    this.currentApplicationId = value.application.id;
    this.currentCallbackId = value.callback.id;
  }

  applicationCreated(application: Application) {
    this._createdApplication$.next(application);
  }

  callbackCreated(callback: Callback) {
    this._createdCallback$.next(callback);
  }

  updateApplication(value?: Application) {
    this._selectedApplication$.next(value);
    this._selectedCallback$.next(undefined);
  }

  updateCallback(value?: Callback) {
    this._selectedCallback$.next(value);
  }

  clear() {
    this._selectedCallback$.next(undefined);
    this._selectedApplication$.next(undefined);
  }
}
