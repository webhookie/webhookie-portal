import {Injectable} from '@angular/core';
import {Adapter} from "../../../shared/adapter/adapter";
import {Trace, TraceStatus, TraceStatusUpdate} from "../model/trace";
import {DateUtils} from "../../../shared/date-utils";

@Injectable({
  providedIn: 'root'
})
export class TraceAdapter implements Adapter<Trace> {

  constructor() {
  }

  adapt(item: any): Trace {
    let itemStatusUpdate = item.status
    let status: TraceStatus = itemStatusUpdate.status
    let statusUpdate = new TraceStatusUpdate(
      status,
      DateUtils.toLocalDate(itemStatusUpdate.time)
    );

    return new Trace(
      item.traceId,
      item.topic,
      statusUpdate,
      item.authorizedSubscribers
    );
  }
}
