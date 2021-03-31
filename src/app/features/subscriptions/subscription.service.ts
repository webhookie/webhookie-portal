import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Subscription} from "./subscription";
import {LogService} from "../../shared/log.service";
import {map, tap} from "rxjs/operators";
import {SubscriptionAdapter} from "./subscription.adapter";
import {HttpParams} from "@angular/common/http";
import {Api} from "../../shared/api";

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

  fetchSubscriptions(role: String): Observable<Subscription[]> {
    const params = new HttpParams()
      .set("role", role.valueOf());
    return this.api.json(this.SUBSCRIPTIONS_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' subscriptions`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
