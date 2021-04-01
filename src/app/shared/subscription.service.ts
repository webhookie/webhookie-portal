import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {Api} from "./api";
import {LogService} from "./log.service";
import {SubscriptionAdapter} from "./adapter/subscription.adapter";
import {Subscription} from "./model/subscription";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private SUBSCRIPTIONS_URI = "/subscriptions";

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: SubscriptionAdapter
  ) { }

  fetchSubscriptions(
    role: string,
    topic?: string,
    callbackId?: string
  ): Observable<Array<Subscription>> {
    let params = new HttpParams()
      .set("role", role.valueOf());

    if(topic) {
      params = params.set("topic", topic)
    }

    if(callbackId) {
      params = params.set("callbackId", callbackId)
    }

    return this.api.json(this.SUBSCRIPTIONS_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' subscriptions`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
