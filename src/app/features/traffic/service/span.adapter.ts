import {Injectable} from '@angular/core';
import {Adapter} from "../../../shared/adapter/adapter";
import {Span, SpanRetry, SpanStatus, SpanStatusUpdate} from "../model/span";
import {CallbackAdapter} from "../../../shared/adapter/callback.adapter";

@Injectable({
  providedIn: 'root'
})
export class SpanAdapter implements Adapter<Span> {

  constructor(private readonly callbackAdapter: CallbackAdapter) {
  }

  adapt(item: any): Span {
    let itemStatus = item.status
    let status: SpanStatus = itemStatus.status
    let statusUpdate = new SpanStatusUpdate(
      status,
      itemStatus.time
    );

    let itemNextRetry = item.nextRetry;
    let nextRetry;

    if (itemNextRetry != null) {
      nextRetry = new SpanRetry(
        itemNextRetry.time,
        itemNextRetry.no,
        itemNextRetry.statusCode
      );
    }

    let callback = this.callbackAdapter.adapt(item.callback);

    return new Span(
      item.traceId,
      item.spanId,
      item.application,
      item.entity,
      item.topic,
      callback,
      item.responseCode,
      item.responseBody,
      statusUpdate,
      item.tries,
      nextRetry
    );
  }
}
