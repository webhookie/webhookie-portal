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

import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Topic, WebhookApi} from "./model/webhook-api";
import {filter, map} from "rxjs/operators";
import {Webhook} from "./model/webhook";
import {WebhookSelection} from "./model/webhook-selection";

@Injectable({
  providedIn: 'root'
})
export class WebhooksContext {
  private readonly _webhook$: BehaviorSubject<WebhookSelection|null> = new BehaviorSubject<WebhookSelection | null>(null);

  readonly webhook$: Observable<WebhookSelection|null> = this._webhook$.asObservable();

  // @ts-ignore
  private readonly _forcedWebhook$: Observable<WebhookSelection> = this.webhook$
    .pipe(filter(it => it != null))

  readonly topic$: Observable<Topic> = this._forcedWebhook$
    .pipe(map(it => it.webhook.topic))
  readonly group$: Observable<WebhookApi> = this._forcedWebhook$
    .pipe(map(it => it.api))

  get selectedTopic(): Topic | undefined {
    return this._webhook$.value?.webhook?.topic
  }

  get webhook(): Webhook {
    return this._webhook$.value!.webhook
  }

  get group(): WebhookApi {
    return this._webhook$.value!.api
  }

  editingWebhookApi?: WebhookApi;

  constructor() {
    this.webhook$
      .subscribe(() => {});
  }

  selectWebhookApi(webhookApi: WebhookApi) {
    this.selectWebhook(WebhookSelection.create(webhookApi, webhookApi.webhooks[0]));
  }

  selectWebhook(webhook: WebhookSelection) {
    this._webhook$.next(webhook);
  }

  editingGroup(api: WebhookApi) {
    this.editingWebhookApi = api;
  }

  cancelEditingWebhookApi() {
    this.editingWebhookApi = undefined;
  }

  clearWebhookSelection() {
    this._webhook$.next(null);
  }
}

