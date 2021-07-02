import {Inject, Injectable} from '@angular/core';
import {EMPTY, Observable, of} from "rxjs";
import {map, mergeMap, tap} from "rxjs/operators";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Api} from "../api";
import {LogService} from "./log.service";
import {SubscriptionAdapter} from "../adapter/subscription.adapter";
import {Subscription} from "../model/subscription";
import {HttpResponseType} from "./api.service";
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
    return this.api.json(this.SUBSCRIPTIONS_URI, params, RequestUtils.hideLoadingHeader())
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' subscriptions`)),
        map(it => this.adapter.adaptList(it))
      )
  }

  createSubscription(topic?: string, callbackId?: string): Observable<Subscription> {
    let request = {
      topic: topic,
      callbackId: callbackId
    }

    return this.api.post("/subscriptions", request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(map(it => this.adapter.adapt(it.body)))
  }

  updateSubscription(subscription: Subscription, callbackId: string): Observable<Subscription> {
    let request = {
      callbackId: callbackId
    }

    return this.api.put(`/subscriptions/${subscription.id}`, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(map(it => this.adapter.adapt(it.body)))
  }

  validateSubscription(subscription: Subscription, request: ValidateSubscriptionRequest): Observable<Subscription> {
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", "*/*")
    Object.keys(request.headers)
      .forEach(k => headers.set(k, request.headers[k]))
    return this.api.post(`/subscriptions/${subscription?.id}/validate`, request, httpParams, headers, HttpResponseType.TEXT)
      .pipe(mergeMap(() => this.fetchSubscription(subscription.id)))
  }

  fetchSubscription(id: string): Observable<Subscription> {
    return this.api.json(`/subscriptions/${id}`)
      .pipe(map(it => this.adapter.adapt(it)))
  }

  activateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription.id, "activate");
  }

  deactivateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription.id, "deactivate");
  }

  suspendSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription.id, "suspend");
  }

  unsuspendSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscription.id, "unsuspend");
  }

  unblockSubscription(subscriptionId: string): Observable<Subscription> {
    return this.subscriptionStatusUpdate(subscriptionId, "unblock");
  }

  private subscriptionStatusUpdate(id: string, action: string): Observable<Subscription> {
    this.log.debug(`'${action.toUpperCase()}'ing subscription: ${id}`)
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", ["text/plain", "application/json"]);
    let body = {
      reason: ""
    };
    return this.api
      .post(`/subscriptions/${id}/${action}`, body, httpParams, headers, HttpResponseType.TEXT)
      .pipe(
        tap(it => this.log.debug(`Subscription '${id}' was updated to: ${it.body}`)),
        mergeMap(() => this.fetchSubscription(id))
      )
  }
}

export interface ValidateSubscriptionRequest {
  payload: any,
  headers: any
}
