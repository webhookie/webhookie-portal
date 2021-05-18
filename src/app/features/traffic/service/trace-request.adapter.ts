import {Injectable} from '@angular/core';
import {BaseAdapter} from "../../../shared/adapter/adapter";
import {TraceRequest} from "../model/trace-request";

@Injectable({
  providedIn: 'root'
})
export class TraceRequestAdapter extends BaseAdapter<TraceRequest> {
  adapt(item: any): TraceRequest {
    return new TraceRequest(
      item.traceId,
      item.contentType,
      item.payload,
      item.headers
    );
  }
}
