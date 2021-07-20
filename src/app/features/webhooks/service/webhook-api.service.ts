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

    this.appContext.isLoggedIn
      .pipe(filter(it => it))
      .pipe(mergeMap(() => this.myWebhookApis()))
      .subscribe(it => this.log.info(`${it.length} Webhook APi(s) reloaded after login`));
  }

  public myWebhookApis(): Observable<Array<WebhookApi>> {
    this.log.info(`Fetching user's webhook apis...`);
    return this.api.json(this.WEBHOOKAPIS_URI)
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' webhook apis`)),
        mergeMap(it => this.webhookApiAdapter.adaptList(it)),
        tap(it => {
          this._webhooks$.next(it);
          this._filteredWebhook$.next(it);
        })
      )
  }

  fetchByTopic(topic: string): Observable<WebhookApi> {
    this.log.info(`Fetching webhook api by topic: ${topic}...`);
    let uri = `${this.WEBHOOKAPIS_URI}/byTopic`;
    const params = new HttpParams().set("topic", topic)
    return this.api.json(uri, params)
      .pipe(mergeMap(it => this.webhookApiAdapter.adapt(it)))
  }

  fetchById(id: string): Observable<WebhookApi> {
    this.log.info(`Fetching webhook api by id: ${id}...`);
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
