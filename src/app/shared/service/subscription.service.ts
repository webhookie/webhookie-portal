import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map, mergeMap, tap} from "rxjs/operators";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Api} from "../api";
import {LogService} from "./log.service";
import {SubscriptionAdapter} from "../adapter/subscription.adapter";
import {Subscription} from "../model/subscription";
import {ApiService} from "./api.service";
import {Pageable} from "../request/pageable";
import {RequestUtils} from "../request/request-utils";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private SUBSCRIPTIONS_URI = "/subscriptions";

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: SubscriptionAdapter
  ) {
  }

  fetchSubscriptions(filter: any, pageable: Pageable): Observable<Array<Subscription>> {
    let params = RequestUtils.httpParams(filter, pageable);
    return this.api.json(this.SUBSCRIPTIONS_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' subscriptions`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }

  createSubscription(topic?: string, callbackId?: string): Observable<Subscription> {
    let request = {
      topic: topic,
      callbackId: callbackId
    }

    return this.api.post("/subscriptions", request, new HttpParams(), new HttpHeaders(), ApiService.RESPONSE_TYPE_JSON)
      .pipe(map(it => this.adapter.adapt(it.body)))
  }

  validateSubscription(subscription: Subscription, request: ValidateSubscriptionRequest): Observable<Subscription> {
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", ["text/plain", "application/json"])
      .set("Content-Type", "application/json")
    return this.api.post(`/subscriptions/${subscription?.id}/validate`, request, httpParams, headers, ApiService.RESPONSE_TYPE_TEXT)
      .pipe(mergeMap(() => this.fetchSubscription(subscription.id)))
  }

  fetchSubscription(id: string): Observable<Subscription> {
    return this.api.json(`/subscriptions/${id}`)
      .pipe(map(it => this.adapter.adapt(it)))
  }

  activateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription, "activate");
  }

  deactivateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription, "deactivate");
  }

  suspendSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription, "suspend");
  }

  unsuspendSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription, "unsuspend");
  }

  unblockSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription, "unblock");
  }

  private subscriptionStatusUpdate(subscription: Subscription, action: string): Observable<Subscription> {
    this.log.debug(`'${action.toUpperCase()}'ing subscription: ${subscription.id}`)
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", ["text/plain", "application/json"]);
    let body = {
      reason: ""
    };
    return this.api
      .post(`/subscriptions/${subscription?.id}/${action}`, body, httpParams, headers, ApiService.RESPONSE_TYPE_TEXT)
      .pipe(
        tap(it => this.log.debug(`Subscription '${subscription.id}' was updated to: ${it.body}`)),
        mergeMap(() => this.fetchSubscription(subscription.id))
      )
  }
}

export interface ValidateSubscriptionRequest {
  payload: string,
  headers: any
}
