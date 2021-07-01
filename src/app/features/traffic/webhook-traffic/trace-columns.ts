import {BaseTableColumn} from "../../../shared/model/table/column/table-column";
import {Trace, TraceStatus} from "../model/trace";
import {MoreDataTableColumn} from "../../../shared/model/table/column/more-data-table-column";
import {StringUtils} from "../../../shared/string-utils";
import {DateUtils} from "../../../shared/date-utils";

export class TraceIdColumn extends BaseTableColumn<Trace> {
  value(data: Trace): string {
    return StringUtils.truncatedUUID(data.traceId);
  }
}

export class WebhookColumn extends BaseTableColumn<Trace> {
  value(data: Trace): string {
    return data.topic;
  }
}

export class SubscribersColumn extends BaseTableColumn<Trace> {
  value(data: Trace): string {
    return data.authorizedSubscribersString;
  }
}

export class TimestampColumn extends BaseTableColumn<Trace> {
  value(data: Trace): string {
    return DateUtils.format(data.statusUpdate.time);
  }
}

export class TraceStatusColumn extends BaseTableColumn<Trace> {
  value(data: Trace): string {
    return `<h5><span class="${TraceColumnUtils.classByStatus(data)} font-weight-bold">${data.statusUpdate.status}</span></h5>`;
  }

  clazz = "text-left"
}

export class TraceMoreDataColumn extends MoreDataTableColumn<Trace> {
  constructor(
    public clazz: string,
    public name: string,
  ) {
    super();
  }
}

class TraceColumnUtils {
  static classByStatus(trace: Trace): string {
    let clazz;
    switch (trace.statusUpdate.status) {
      case TraceStatus.PROCESSING:
        clazz = "dark";
        break;
      case TraceStatus.NO_SUBSCRIPTION:
        clazz = "dark";
        break;
      case TraceStatus.OK:
        clazz = "success";
        break;
      case TraceStatus.ISSUES:
        clazz = "danger";
        break;
      default:
        clazz = "dark";
        break;
    }

    return `badge badge-pill badge-${clazz} border-radius`
  }
}
