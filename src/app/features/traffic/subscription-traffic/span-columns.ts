import {BaseTableColumn, NumberTableColumn} from "../../../shared/model/table/column/table-column";
import {Span, SpanStatus} from "../model/span";
import {DateUtils} from "../../../shared/date-utils";

export class TraceIdColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return data.traceId
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
    return data.spanId;
  }
}

export class ResponseCodeColumn extends NumberTableColumn<Span>{
  value(data: Span): string {
    return `<strong><span class="${SpanColumnUtils.classByResponseCode(data)}">${data.responseCode != -1 ? data.responseCode : ""}</span></strong>`;
  }
}

export class SpanStatusColumn extends BaseTableColumn<Span>{
  value(data: Span): string {
    return `<h5><span class="${SpanColumnUtils.classByStatus(data)} font-weight-bold">${data.statusUpdate.status}</span></h5>`;
  }

  clazz = "text-left"
}

export class TriesColumn extends NumberTableColumn<Span>{
  value(data: Span): string {
    return `${data.tries}`;
  }
}

class SpanColumnUtils {
  static classByStatus(span: Span): string {
    let clazz;
    switch (span.statusUpdate.status) {
      case SpanStatus.OK:
        clazz = "success";
        break;
      case SpanStatus.RETRYING:
        clazz = "warning";
        break;
      case SpanStatus.BLOCKED:
        clazz = "danger";
        break;
      case SpanStatus.NOT_OK:
        clazz = "danger";
        break;
      case SpanStatus.PROCESSING:
        clazz = "dark";
        break;
      default:
        clazz = "dark";
        break;
    }

    return `badge badge-pill badge-${clazz} border-radius`
  }

  static classByResponseCode(span: Span): string {
    let clazz;
    if(span.responseCode > 199 && span.responseCode < 300) {
      clazz = "success";
    } else if(span.responseCode > 299 && span.responseCode < 400) {
      clazz = "warning";
    } else if(span.responseCode > 399) {
      clazz = "danger";
    } else {
      clazz = "dark";
    }

    return `text-${clazz}`
  }
}

