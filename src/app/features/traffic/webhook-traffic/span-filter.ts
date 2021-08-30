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

import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, skip} from "rxjs/operators";
import {Application} from "../../webhooks/model/application";
import {Callback} from "../../../shared/model/callback";
import {WebhookTrafficFilter} from "./webhook-traffic-filter";

/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 1/6/21 12:41
 */

export class SpanFilter {
  constructor(public initialFilter: WebhookTrafficFilter) {
  }

  private readonly _filter$: BehaviorSubject<WebhookTrafficFilter> = new BehaviorSubject<WebhookTrafficFilter>(this.initialFilter);
  private readonly filter$: Observable<WebhookTrafficFilter> = this._filter$.asObservable();

  // @ts-ignore
  readonly whenEntitySet$: Observable<string> = this.filter$
    .pipe(
      filter(it => it.entity != undefined),
      map(it => it.entity)
    )

  // @ts-ignore
  readonly whenApplicationSet$: Observable<string> = this.filter$
    .pipe(
      filter(it => it.entity != undefined),
      filter(it => it.applicationId != undefined),
      map(it => it.applicationId)
    )

  readonly whenSet$: Observable<WebhookTrafficFilter> = this.filter$
    .pipe(skip(1))

  get current(): WebhookTrafficFilter {
    return this._filter$.value
  }

  next(newFilter: WebhookTrafficFilter) {
    this._filter$.next(newFilter)
  }

  get entity(): string | undefined {
    return this.current.entity
  }

  get applicationId(): string | undefined {
    return this.current.applicationId
  }

  get callbackId(): string | undefined {
    return this.current.callbackId
  }

  get subscriptionId(): string | undefined {
    return this.current.subscriptionId
  }

  selectEntity(entity?: string) {
    if (this.entity == entity) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: entity
    }

    this.next(newFilter)
  }

  selectApplication(application?: Application) {
    if (this.applicationId == application?.id) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: this.entity,
      applicationId: application?.id,
    }

    this.next(newFilter)
  }

  selectCallback(callback?: Callback) {
    if (this.callbackId == callback?.id) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: this.entity,
      applicationId: this.applicationId,
      callbackId: callback?.id
    }

    this.next(newFilter)
  }

  clearEntity() {
    this.selectEntity(undefined)
  }

  clearApplication() {
    this.selectApplication(undefined)
  }

  clearCallback() {
    this.selectCallback(undefined)
  }

  clear() {
    this.initialFilter = {};
  }
}
