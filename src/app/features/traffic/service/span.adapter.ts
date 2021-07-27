/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
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

import {Injectable} from '@angular/core';
import {BaseAdapter} from "../../../shared/adapter/adapter";
import {Span, SpanRetry, SpanStatus, SpanStatusUpdate, SubscriptionDetails} from "../model/span";
import {CallbackAdapter} from "../../../shared/adapter/callback.adapter";
import {DateUtils} from "../../../shared/date-utils";
import {ApplicationDetails} from "../../../shared/model/subscription";

@Injectable({
  providedIn: 'root'
})
export class SpanAdapter extends BaseAdapter<Span> {

  constructor(private readonly callbackAdapter: CallbackAdapter) {
    super();
  }

  adapt(item: any): Span {
    let itemStatus = item.status
    let status: SpanStatus = itemStatus.status
    let statusUpdate = new SpanStatusUpdate(
      status,
      DateUtils.toLocalDate(itemStatus.time)
    );

    let itemNextRetry = item.nextRetry;
    let nextRetry;

    if (itemNextRetry != null) {
      nextRetry = new SpanRetry(
        DateUtils.toLocalDate(itemNextRetry.time),
        itemNextRetry.no,
        itemNextRetry.statusCode
      );
    }
    let subscriptionItem = item.subscription

    let callback = this.callbackAdapter.adapt(subscriptionItem.callback);
    let ia = subscriptionItem.application
    let application = new ApplicationDetails(
      ia.id,
      ia.name,
      ia.entity
    );
    let subscription = new SubscriptionDetails(
      subscriptionItem.id,
      application,
      subscriptionItem.topic,
      callback
    )

    return new Span(
      item.traceId,
      item.spanId,
      subscription,
      item.responseCode,
      item.responseBody,
      statusUpdate,
      item.tries,
      nextRetry
    );
  }
}
