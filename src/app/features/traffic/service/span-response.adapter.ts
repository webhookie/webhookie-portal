import {Injectable} from '@angular/core';
import {Adapter} from "../../../shared/adapter/adapter";
import {SpanResponse} from "../model/span-response";

@Injectable({
  providedIn: 'root'
})
export class SpanResponseAdapter implements Adapter<SpanResponse> {

  constructor() {
  }

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
