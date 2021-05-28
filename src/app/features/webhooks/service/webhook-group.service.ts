import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, mergeMap, tap} from "rxjs/operators";
import {WebhookGroupAdapter} from "./adapter/webhook-group.adapter";
import {WebhookGroup} from "../model/webhook-group";
import {Api} from "../../../shared/api";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/service/api.service";
import {Webhook} from "../model/webhook";
import {StringUtils} from "../../../shared/string-utils";
import {ApplicationContext} from "../../../shared/application.context";

@Injectable({
  providedIn: 'root'
})
export class WebhookGroupService {
  private WEBHOOKGROUPS_URI = "/webhookgroups"

  private readonly _webhooks$: BehaviorSubject<Array<WebhookGroup>> = new BehaviorSubject<Array<WebhookGroup>>([]);
  private readonly _filteredWebhook$: BehaviorSubject<Array<WebhookGroup>> = new BehaviorSubject<Array<WebhookGroup>>([]);
  readonly allWebhook$: Observable<Array<WebhookGroup>> = this._webhooks$.asObservable();
  readonly filteredWebhook$: Observable<Array<WebhookGroup>> = this._filteredWebhook$.asObservable();

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
    private readonly webhookGroupAdapter: WebhookGroupAdapter
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
      .pipe(mergeMap(() => this.myWebhookGroups()))
      .subscribe(it => this.log.info(`${it.length} Webhook APi(s) reloaded after login`));
  }

  public myWebhookGroups(): Observable<Array<WebhookGroup>> {
    console.info(`Fetching user's webhook groups...`);
    return this.api.json(this.WEBHOOKGROUPS_URI)
      .pipe(
        tap(it => console.info(`Fetched '${it.length}' webhook groups`)),
        mergeMap(it => this.webhookGroupAdapter.adaptList(it)),
        tap(it => {
          this._webhooks$.next(it);
          this._filteredWebhook$.next(it);
        })
      )
  }

  fetchByTopic(topic: string): Observable<WebhookGroup> {
    this.log.info(`Fetching webhook group by topic: ${topic}...`);
    let uri = `${this.WEBHOOKGROUPS_URI}/byTopic`;
    const params = new HttpParams().set("topic", topic)
    return this.api.json(uri, params)
      .pipe(mergeMap(it => this.webhookGroupAdapter.adapt(it)))
  }

  fetchById(id: string): Observable<WebhookGroup> {
    this.log.info(`Fetching webhook group by id: ${id}...`);
    let uri = `${this.WEBHOOKGROUPS_URI}/${id}`;
    return this.api.json(uri, new HttpParams())
      .pipe(mergeMap(it => this.webhookGroupAdapter.adapt(it)))
  }

  create(request: any): Observable<WebhookGroup> {
    this.log.info(`Creating WebhookGroup...`);
    return this.api.post(this.WEBHOOKGROUPS_URI, request, new HttpParams(), new HttpHeaders(), ApiService.RESPONSE_TYPE_JSON)
      .pipe(mergeMap((it: HttpResponse<any>) => this.webhookGroupAdapter.adapt(it.body)));
  }

  update(request: any, id: string) {
    this.log.info(`Creating WebhookGroup...`);
    let uri = `${this.WEBHOOKGROUPS_URI}/${id}`;
    return this.api.put(uri, request, new HttpParams(), new HttpHeaders(), ApiService.RESPONSE_TYPE_JSON)
      .pipe(mergeMap((it: HttpResponse<any>) => this.webhookGroupAdapter.adapt(it.body)));
  }
}
