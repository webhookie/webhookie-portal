import {BaseTableColumn} from "../../../shared/model/table/column/table-column";
import {Trace} from "../model/trace";
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

export class StatusColumn extends BaseTableColumn<Trace> {
  value(data: Trace): string {
    return data.statusUpdate.status;
  }
}

export class TraceMoreDataColumn extends MoreDataTableColumn<Trace> {
  constructor(
    public clazz: string,
    public name: string,
  ) {
    super();
  }
}
