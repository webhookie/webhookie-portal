import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {Observable} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import {WebhookGroupAdapter} from "./adapter/webhook-group.adapter";
import {WebhookGroup} from "../model/webhook-group";
import {Api} from "../../../shared/api";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/service/api.service";

@Injectable({
  providedIn: 'root'
})
export class WebhookGroupService {
  private WEBHOOKGROUPS_URI = "/webhookgroups"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly webhookGroupAdapter: WebhookGroupAdapter
  ) {
  }

  public myWebhookGroups(): Observable<Array<WebhookGroup>> {
    this.log.info("Fetching user's webhook groups...");
    return this.api.json(this.WEBHOOKGROUPS_URI)
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' webhook groups`)),
        mergeMap(it => this.webhookGroupAdapter.adaptList(it))
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
