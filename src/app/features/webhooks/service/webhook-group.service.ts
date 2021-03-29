import { Injectable } from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {WebhookGroupAdapter} from "./webhook-group.adapter";
import {WebhookGroup} from "../model/webhook-group";

@Injectable({
  providedIn: 'root'
})
export class WebhookGroupService {
  private WEBHOOKGROUPS_URI = "/webhookgroups"

  constructor(
    private readonly api: ApiService,
    private readonly log: LogService,
    private readonly webhookGroupAdapter: WebhookGroupAdapter
  ) { }

  public myWebhookGroups(): Observable<WebhookGroup[]> {
    this.log.info("Fetching user's webhook groups...");
    return this.api.json(this.WEBHOOKGROUPS_URI)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' webhook groups`)))
      .pipe(map(list => {
        return list.map((it: any) => this.webhookGroupAdapter.adapt(it))
      }))
  }
}
