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

import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, mergeMap, tap} from "rxjs/operators";
import {WebhookApiAdapter} from "./adapter/webhook-api-adapter.service";
import {WebhookApi} from "../model/webhook-api";
import {Api} from "../../../shared/api";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {HttpResponseType} from "../../../shared/service/api.service";
import {Webhook} from "../model/webhook";
import {StringUtils} from "../../../shared/string-utils";
import {ApplicationContext} from "../../../shared/application.context";

@Injectable({
  providedIn: 'root'
})
export class WebhookApiService {
  private WEBHOOKAPIS_URI = "/webhookapis"

  private readonly _webhooks$: BehaviorSubject<Array<WebhookApi>> = new BehaviorSubject<Array<WebhookApi>>([]);
  private readonly _filteredWebhook$: BehaviorSubject<Array<WebhookApi>> = new BehaviorSubject<Array<WebhookApi>>([]);
  readonly allWebhook$: Observable<Array<WebhookApi>> = this._webhooks$.asObservable();
  readonly filteredWebhook$: Observable<Array<WebhookApi>> = this._filteredWebhook$.asObservable();

  readonly searchSubject$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  get searchMode(): Observable<boolean> {
    return this.searchSubject$.asObservable()
      .pipe(map(it => it.trim().length > 2))
  }

  matches(webhook: Webhook): boolean {
    return webhook.topic.matches(this.searchSubject$.value)
  }

  highlightedName(title: string): string {
    let phrase = this.searchSubject$.value;
    if(phrase.trim().length < 3) {
      return title;
    }

    return StringUtils.highlightIn(title, phrase);
  }

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly appContext: ApplicationContext,
    private readonly webhookApiAdapter: WebhookApiAdapter
  ) {
    this.searchSubject$
      .pipe(filter(it => it.trim() == ""))
      .subscribe(() => this._filteredWebhook$.next(this._webhooks$.value));

    this.searchSubject$
      .pipe(filter(it => it.trim().length > 2))
      .pipe(map(v => this._webhooks$.value.filter(it => it.matches(v))))
      .subscribe(it => this._filteredWebhook$.next(it));

    this.appContext.isLoggedIn$
      .pipe(filter(it => it))
      .pipe(mergeMap(() => this.myWebhookApis()))
      .subscribe(it => this.log.info(`${it.length} Webhook API(s) reloaded after login`));
  }

  public myWebhookApis(): Observable<Array<WebhookApi>> {
    this.log.info(`Fetching user's webhook APIs...`);
    return this.api.json(this.WEBHOOKAPIS_URI)
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' webhook APIs`)),
        mergeMap(it => this.webhookApiAdapter.adaptList(it)),
        tap(it => {
          this._webhooks$.next(it);
          this._filteredWebhook$.next(it);
        })
      )
  }

  fetchByTopic(topic: string): Observable<WebhookApi> {
    this.log.info(`Fetching webhook API by topic: ${topic}...`);
    let uri = `${this.WEBHOOKAPIS_URI}/byTopic`;
    const params = new HttpParams().set("topic", topic)
    return this.api.json(uri, params)
      .pipe(mergeMap(it => this.webhookApiAdapter.adapt(it)))
  }

  delete(webhookApi: WebhookApi): Observable<WebhookApi> {
    this.log.info(`Deleting webhook API by id: ${webhookApi.id}...`);
    let headers = new HttpHeaders()
      .set("Accept", ["text/plain", "application/json"]);
    return this.api.delete(`${this.WEBHOOKAPIS_URI}/${webhookApi.id}`, headers, HttpResponseType.TEXT)
      .pipe(map(() => webhookApi))
  }

  fetchById(id: string): Observable<WebhookApi> {
    this.log.info(`Fetching webhook API by id: ${id}...`);
    let uri = `${this.WEBHOOKAPIS_URI}/${id}`;
    return this.api.json(uri, new HttpParams())
      .pipe(mergeMap(it => this.webhookApiAdapter.adapt(it)))
  }

  create(request: any): Observable<WebhookApi> {
    this.log.info(`Creating WebhookApi...`);
    return this.api.post(this.WEBHOOKAPIS_URI, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(mergeMap((it: HttpResponse<any>) => this.webhookApiAdapter.adapt(it.body)));
  }

  update(request: any, id: string) {
    this.log.info(`Creating WebhookApi...`);
    let uri = `${this.WEBHOOKAPIS_URI}/${id}`;
    return this.api.put(uri, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(mergeMap((it: HttpResponse<any>) => this.webhookApiAdapter.adapt(it.body)));
  }
}
