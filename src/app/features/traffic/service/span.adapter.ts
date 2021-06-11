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
