import {Trace, TraceStatus} from "../model/trace";
import {TraceContextMenu, TraceMenu} from "./trace-menu";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {EmptyTableHeader} from "../../../shared/model/table/header/empty-table-header";
import {SelectableTableHeader} from "../../../shared/model/table/header/selectable-table-header";
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
import {SelectableTableColumn} from "../../../shared/model/table/column/selectable-table-column";
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
      new SelectableTableHeader("sticky-cell sticky-second-cell", "Webhook_Header2"),
      new SortableTableHeader("Trace Id", "traceId"),
      new SortableTableHeader("Webhook", "topic"),
      new SortableTableHeader("Status", "statusUpdate.status", "text-center"),
      new SortableTableHeader("Timestamp", "statusUpdate.time"),
      new SortableTableHeader("Authorized Subscribers", "consumerMessage.authorizedSubscribers"),
    ]
  }

  get filters(): Array<TableFilter> {
    return [
      new EmptyTableFilter("sticky-cell bg-light-gray", "Webhook_Filter1", ""),
      new EmptyTableFilter("sticky-second-cell sticky-cell bg-light-gray", "Webhook_Filter2", ""),
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
      new SelectableTableColumn("sticky-cell sticky-second-cell", "Webhook_Select_Column"),
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
