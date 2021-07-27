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

import {Trace, TraceStatus} from "../model/trace";
import {TraceContextMenu, TraceMenu} from "./trace-menu";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {EmptyTableHeader} from "../../../shared/model/table/header/empty-table-header";
import {SortableTableHeader} from "../../../shared/model/table/header/sortable-table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {EmptyTableFilter} from "../../../shared/model/table/filter/empty-table-filter";
import {SearchTableFilter} from "../../../shared/model/table/filter/search-table-filter";
import {SearchListTableFilter} from "../../../shared/model/table/filter/search-list-table-filter";
import {TimestampTableFilter} from "../../../shared/model/table/filter/timestamp-table-filter";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {
  SubscribersColumn,
  TimestampColumn,
  TraceIdColumn,
  TraceMoreDataColumn,
  TraceStatusColumn,
  WebhookColumn
} from "./trace-columns";
import {ContextMenuTableColumn} from "../../../shared/model/table/column/context-menu-table-column";
import {ContextMenuItemBuilder} from "../../../shared/model/table/column/context-menu-item";

/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 1/6/21 11:53
 */

export class TraceTable {
  constructor(
    public handler: (trace: Trace, item: TraceContextMenu) => any) {
  }

  get headers(): Array<TableHeader> {
    return [
      new EmptyTableHeader("sticky-cell", "Webhook_Header1"),
      new SortableTableHeader("Trace Id", "traceId"),
      new SortableTableHeader("Webhook", "topic"),
      new SortableTableHeader("Status", "statusUpdate.status"),
      new SortableTableHeader("Timestamp", "statusUpdate.time"),
      new SortableTableHeader("Authorized Subscribers", "consumerMessage.authorizedSubscribers"),
    ]
  }

  get filters(): Array<TableFilter> {
    return [
      new EmptyTableFilter("sticky-cell bg-light-gray", "Webhook_Filter1", ""),
      new SearchTableFilter("", "traceId", "Trace Id"),
      new SearchTableFilter("", "topic", "Webhook"),
      new SearchListTableFilter("", "status", "Status", TraceStatus),
      new TimestampTableFilter("", "timestamp", "Timestamp"),
      new SearchTableFilter("", "authorizedSubscribers", "Authorized Subscribers"),
      new EmptyTableFilter("", "Webhook_Filter2", ""),
    ]
  }

  get columns(): Array<TableColumn> {
    return [
      new TraceMoreDataColumn("text-center sticky-cell", "Webhook_More_Column"),
      new TraceIdColumn("Webhook_TraceId_Column"),
      new WebhookColumn("Webhook_Topic_Column"),
      new TraceStatusColumn("Webhook_Status_Column"),
      new TimestampColumn("Webhook_Timestamp_Column"),
      new SubscribersColumn("Webhook_Auth_Subscribers_Column"),
      new ContextMenuTableColumn(this.createTraceContextMenuItems()),
    ];
  }

  private createTraceContextMenuItems() {
    return [
      ContextMenuItemBuilder.create<Trace, TraceMenu>(TraceMenu.VIEW_REQUEST).handler(this.handler).build(),
    ];
  }
}
