import {BaseTableColumn, NumberTableColumn} from "../../../shared/model/table/column/table-column";
import {Span, SpanStatus} from "../model/span";
import {StringUtils} from "../../../shared/string-utils";
import {DateUtils} from "../../../shared/date-utils";

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
    return `<a class="text-primary" title="${data.callback.url}">${data.callback.name}</a>`;
  }
}

export class TimestampColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return DateUtils.format(data.statusUpdate.time);
  }
}

export class SpanIdColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return StringUtils.truncatedUUID(data.spanId);
  }
}

export class ResponseCodeColumn extends NumberTableColumn<Span>{
  value(data: Span): string {
    return `<span class="${SpanColumnUtils.classByStatus(data)}">${data.responseCode != -1 ? data.responseCode : ""}</span>`;
  }
}

export class StatusColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return `<span class="${SpanColumnUtils.classByStatus(data)} font-weight-bold">${data.statusUpdate.status}</span>`;
  }

  clazz = "text-center"
}

export class TriesColumn extends NumberTableColumn<Span>{
  value(data: Span): string {
    return `${data.tries}`;
  }
}

class SpanColumnUtils {
  static classByStatus(span: Span): string {
    switch (span.statusUpdate.status) {
      case SpanStatus.OK:
        return  "text-success";
      case SpanStatus.RETRYING:
        return  "text-warning";
      case SpanStatus.BLOCKED:
        return  "text-warning";
      case SpanStatus.NOT_OK:
        return  "text-danger";
      case SpanStatus.PROCESSING:
        return  "text-primary";
      default:
        return "text-default";
    }
  }
}

