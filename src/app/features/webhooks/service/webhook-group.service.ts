import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {WebhookGroupAdapter} from "./adapter/webhook-group.adapter";
import {WebhookGroup} from "../model/webhook-group";
import {Api} from "../../../shared/api";
import {HttpParams} from "@angular/common/http";

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
        map(list => list.map((it: any) => this.webhookGroupAdapter.adapt(it)))
      )
  }

  fetchByTopic(topic: string): Observable<WebhookGroup> {
    this.log.info(`Fetching webhook group by topic: ${topic}...`);
    let uri = `${this.WEBHOOKGROUPS_URI}/byTopic`;
    const params = new HttpParams().set("topic", topic)
    return this.api.json(uri, params)
      .pipe(map(it => this.webhookGroupAdapter.adapt(it)))
  }
}
