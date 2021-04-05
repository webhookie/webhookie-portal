import {Inject, Injectable} from '@angular/core';
import {LogService} from "./log.service";
import {ConsumerGroupAdapter} from "./adapter/consumer-group.adapter";
import {Observable} from "rxjs";
import {ConsumerGroup} from "./model/consumer-group";
import {Api} from "./api";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebhookieService {

  constructor(
    private readonly log: LogService,
    @Inject("Api") private readonly api: Api,
    private readonly consumerGroupAdapter: ConsumerGroupAdapter
  ) {
  }

  fetchConsumerGroups(): Observable<Array<ConsumerGroup>> {
    return this.api.json("/admin/consumergroups")
      .pipe(
        map(list => list.map((it: any) => this.consumerGroupAdapter.adapt(it)))
      )
  }
}
