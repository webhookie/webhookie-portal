import {BaseTrafficColumn} from "../common/traffic-table/column/traffic-table-column";
import {Trace} from "../model/trace";
import {MoreDataTrafficColumn} from "../common/traffic-table/column/more-data-traffic-column";
import {StringUtils} from "../../../shared/string-utils";

export class TraceIdColumn extends BaseTrafficColumn<Trace> {
  value(data: Trace): string {
    return StringUtils.truncatedUUID(data.traceId);
  }
}

export class WebhookColumn extends BaseTrafficColumn<Trace> {
  value(data: Trace): string {
    return data.topic;
  }
}

export class SubscribersColumn extends BaseTrafficColumn<Trace> {
  value(data: Trace): string {
    return data.authorizedSubscribersString;
  }
}

export class TimestampColumn extends BaseTrafficColumn<Trace> {
  value(data: Trace): string {
    return `${data.statusUpdate.time}`;
  }
}

export class StatusColumn extends BaseTrafficColumn<Trace> {
  value(data: Trace): string {
    return data.statusUpdate.status;
  }
}

export class StatusDescriptionColumn extends BaseTrafficColumn<Trace> {
  value(data: Trace): string {
    return "";
  }
}

export class TraceMoreDataColumn extends MoreDataTrafficColumn<Trace> {
  constructor(public clazz: string) {
    super();
  }

  loadDetails(data: Trace): void {
  }
}
