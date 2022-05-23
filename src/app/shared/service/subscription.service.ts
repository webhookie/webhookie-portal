/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map, mergeMap, tap} from "rxjs/operators";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Api} from "../api";
import {LogService} from "./log.service";
import {SubscriptionAdapter} from "../adapter/subscription.adapter";
import {Subscription, SubscriptionStatus} from "../model/subscription";
import {HttpResponseType} from "./api.service";
import {Pageable} from "../request/pageable";
import {RequestUtils} from "../request/request-utils";
import {CallbackResponse} from "../model/callback/callback-response";
import {SubscriptionApprovalDetailsAdapter} from "../adapter/subscription-approval-details.adapter";
import {ProfileService, UserProfile} from "./profile.service";
import {Optional} from "../model/optional";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private SUBSCRIPTIONS_URI = "/subscriptions";

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly profileService: ProfileService,
    private readonly approvalDetailsAdapter: SubscriptionApprovalDetailsAdapter,
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

  createSubscription(topic: string, callbackId: string): Observable<Subscription> {
    let request = {
      topic: topic,
      callbackId: callbackId
    }

    return this.api.post(this.SUBSCRIPTIONS_URI, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(map(it => this.adapter.adapt(it.body)))
  }

  updateSubscription(subscriptionId: string, callbackId: string): Observable<Subscription> {
    let request = {
      callbackId: callbackId
    }

    let uri = `${this.SUBSCRIPTIONS_URI}/${subscriptionId}`;
    return this.api.put(uri, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(map(it => this.adapter.adapt(it.body)))
  }

  validateSubscription(subscription: Subscription, request: ValidateSubscriptionRequest): Observable<CallbackResponse> {
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", "*/*")
    Object.keys(request.headers)
      .forEach(k => headers.set(k, request.headers[k]))
    return this.api.post(`${this.SUBSCRIPTIONS_URI}/${subscription?.id}/verify`, request, httpParams, headers, HttpResponseType.TEXT)
      .pipe(map((it: HttpResponse<any>) => new CallbackResponse(it.status, it.headers, it.body)))
  }

  fetchSubscription(id: string): Observable<Subscription> {
    return this.api.json(`${this.SUBSCRIPTIONS_URI}/${id}`)
      .pipe(map(it => this.adapter.adapt(it)))
  }

  delete(subscription: Subscription): Observable<Subscription> {
    let headers = new HttpHeaders()
      .set("Accept", ["text/plain", "application/json"]);
    return this.api.delete(`${this.SUBSCRIPTIONS_URI}/${subscription.id}`, headers, HttpResponseType.TEXT)
      .pipe(map(() => subscription))
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
      .post(`${this.SUBSCRIPTIONS_URI}/${id}/${action}`, body, httpParams, headers, HttpResponseType.TEXT)
      .pipe(
        tap(it => this.log.debug(`Subscription '${id}' was updated to: ${it.body}`)),
        mergeMap(() => this.fetchSubscription(id))
      )
  }

  submitForApproval(subscriptionId: string, reason: string): Observable<Subscription> {
    this.log.debug(`Submitting subscription for approval: ${subscriptionId}`)
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", ["application/json"]);
    let body = {
      reason: reason,
      requester: this.profileService.profile
    }
    return this.api
      .post(`${this.SUBSCRIPTIONS_URI}/${subscriptionId}/submit`, body, httpParams, headers, HttpResponseType.JSON)
      .pipe(tap(() => this.log.debug(`Subscription '${subscriptionId}' has been submitted for approval`)))
      .pipe(map(it => this.adapter.adapt(it.body)))
  }

  readSubmitRequest(id: string): Observable<SubscriptionApprovalDetails> {
    return this.api.json(`${this.SUBSCRIPTIONS_URI}/${id}/submitRequest`)
      .pipe(map(it => this.approvalDetailsAdapter.adapt(it)))
  }

  approveSubscription(subscriptionId: string): Observable<Subscription> {
    this.log.debug(`Sending Approve subscription request: ${subscriptionId}`)
    let body: ApproveSubscriptionRequest = {
      user: this.profileService.profile
    }
    return this.patchSubscription(subscriptionId, "approve", body)
      .pipe(tap(() => this.log.debug(`Subscription '${subscriptionId}' has been submitted for approval`)))
  }

  rejectSubscription(subscriptionId: string, reason: string): Observable<Subscription> {
    this.log.debug(`Sending Reject subscription request: ${subscriptionId}`)
    let body: RejectSubscriptionRequest = {
      user: this.profileService.profile,
      reason: reason
    }
    return this.patchSubscription(subscriptionId, "reject", body)
      .pipe(tap(() => this.log.debug(`Subscription '${subscriptionId}' has been submitted for approval`)))
  }

  patchSubscription(id: string, action: string, body: any): Observable<Subscription> {
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", ["application/json"]);
    return this.api
      .patch(`${this.SUBSCRIPTIONS_URI}/${id}/${action}`, body, httpParams, headers, HttpResponseType.JSON)
      .pipe(map(it => this.adapter.adapt(it.body)))
  }

  updateTransformation(id: string, transformation: string): Observable<Subscription> {
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", ["application/json"]);
    let body = {
      transform: transformation
    }
    return this.api
      .patch(`${this.SUBSCRIPTIONS_URI}/${id}/transformation`, body, httpParams, headers, HttpResponseType.JSON)
      .pipe(map(it => this.adapter.adapt(it.body)))
  }
}

export interface ValidateSubscriptionRequest {
  payload: any,
  headers: any
}

export interface SubscriptionApprovalDetails {
  reason: string;
  requester: UserProfile;
  at: Date
  result: Optional<SubscriptionApprovalResult>;
}

export interface SubscriptionApprovalResult {
  user: UserProfile
  at: Date
  status: SubscriptionStatus
  reason: Optional<string>
}

export interface ApproveSubscriptionRequest {
  user: UserProfile
}

export interface RejectSubscriptionRequest extends ApproveSubscriptionRequest {
  reason: string
}
