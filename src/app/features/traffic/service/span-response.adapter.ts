import {Injectable} from '@angular/core';
import {BaseAdapter} from "../../../shared/adapter/adapter";
import {SpanResponse} from "../model/span-response";

@Injectable({
  providedIn: 'root'
})
export class SpanResponseAdapter extends BaseAdapter<SpanResponse> {
  adapt(item: any): SpanResponse {
    return new SpanResponse(
      item.spanId,
      item.time,
      item.statusCode,
      item.contentType,
      item.body,
      item.headers
    );
  }
}
