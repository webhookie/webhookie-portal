import {BaseTableColumn, NumberTableColumn} from "../../../shared/components/generic-table/column/table-column";
import {Span} from "../model/span";
import {StringUtils} from "../../../shared/string-utils";

export class TraceIdColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return StringUtils.truncatedUUID(data.traceId);
  }
}

export class ApplicationColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return data.application;
  }
}

export class EntityColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return data.entity;
  }
}

export class WebhookColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return data.topic;
  }
}

export class CallbackColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return data.callback.name;
  }
}

export class TimestampColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return `${data.statusUpdate.time}`;
  }
}

export class SpanIdColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return StringUtils.truncatedUUID(data.spanId);
  }
}

export class ResponseCodeColumn extends NumberTableColumn<Span>{
  value(data: Span): string {
    return `${data.responseCode}`;
  }
}

export class StatusColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return data.statusUpdate.status;
  }
}

export class TriesColumn extends NumberTableColumn<Span>{
  value(data: Span): string {
    return `${data.tries}`;
  }
}

