/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
    return `<h5><span class="${SpanColumnUtils.classByStatus(data)} font-weight-normal">${data.statusUpdate.status}</span></h5>`;
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

