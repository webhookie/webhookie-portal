import {BaseTrafficColumn, NumberTrafficColumn} from "../common/traffic-table/column/traffic-table-column";
import {Span} from "../model/span";
import {StringUtils} from "../../../shared/string-utils";

export class TraceIdColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return StringUtils.truncatedUUID(data.traceId);
  }
}

export class ApplicationColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return data.application;
  }
}

export class EntityColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return data.entity;
  }
}

export class WebhookColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return data.topic;
  }
}

export class CallbackColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return data.callback.name;
  }
}

export class TimestampColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return `${data.statusUpdate.time}`;
  }
}

export class SpanIdColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return StringUtils.truncatedUUID(data.spanId);
  }
}

export class ResponseCodeColumn extends NumberTrafficColumn<Span>{
  value(data: Span): string {
    return `${data.responseCode}`;
  }
}

export class StatusColumn extends BaseTrafficColumn<Span>{
  value(data: Span): string {
    return data.statusUpdate.status;
  }
}

export class TriesColumn extends NumberTrafficColumn<Span>{
  value(data: Span): string {
    return `${data.tries}`;
  }
}

