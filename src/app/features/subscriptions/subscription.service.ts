import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Subscription} from "../../shared/model/subscription";
import {ApiService} from "../../shared/api.service";
import {LogService} from "../../shared/log.service";
import {map, tap} from "rxjs/operators";
import {SubscriptionAdapter} from "../../shared/adapter/subscription.adapter";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private SUBSCRIPTIONS_URI = "/subscriptions";

  constructor(
    private readonly api: ApiService,
    private readonly log: LogService,
    private readonly adapter: SubscriptionAdapter
  ) { }

  mySubscriptions(role: string): Observable<Subscription[]> {
    const params = new HttpParams()
      .set("role", role);
    return this.api.json(this.SUBSCRIPTIONS_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' subscriptions`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
