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

import {BaseTableColumn} from "../../../shared/model/table/column/table-column";
import {Trace, TraceStatus} from "../model/trace";
import {MoreDataTableColumn} from "../../../shared/model/table/column/more-data-table-column";
import {DateUtils} from "../../../shared/date-utils";

export class TraceIdColumn extends BaseTableColumn<Trace> {
  value(data: Trace): string {
    return data.traceId;
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
    return `<h5><span class="${TraceColumnUtils.classByStatus(data)} font-weight-normal">${data.statusUpdate.status}</span></h5>`;
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
