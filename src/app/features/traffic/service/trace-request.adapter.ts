import {Injectable} from '@angular/core';
import {Adapter} from "../../../shared/adapter/adapter";
import {TraceRequest} from "../model/trace-request";

@Injectable({
  providedIn: 'root'
})
export class TraceRequestAdapter implements Adapter<TraceRequest> {

  constructor() {
  }

  adapt(item: any): TraceRequest {
    return new TraceRequest(
      item.traceId,
      item.contentType,
      item.payload,
      item.headers
    );
  }
}
