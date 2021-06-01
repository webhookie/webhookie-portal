import {Span} from "../model/span";
import {SimpleTableHeader, TableHeader} from "../../../shared/model/table/header/table-header";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {
  ApplicationColumn,
  CallbackColumn,
  EntityColumn,
  ResponseCodeColumn,
  SpanIdColumn, SpanStatusColumn, TriesColumn
} from "../subscription-traffic/span-columns";
import {TimestampColumn} from "./trace-columns";
import {ContextMenuTableColumn} from "../../../shared/model/table/column/context-menu-table-column";
import {ContextMenuItemBuilder} from "../../../shared/model/table/column/context-menu-item";
import {TraceSpanContextMenu, TraceSpansMenu} from "./trace-span-menu";

/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 1/6/21 11:48
 */

export class SpanTable {
  constructor(
    public readonly viewRequest: (span: Span, item: TraceSpanContextMenu) => any,
    public readonly viewResponse: (span: Span, item: TraceSpanContextMenu) => any
  ) {
  }

  get headers(): Array<TableHeader> {
    return [
      new SimpleTableHeader("Span Id", "Webhook_Details_Span_Id_Header"),
      new SimpleTableHeader("Company", "Webhook_Details_Company_Header"),
      new SimpleTableHeader("Application", "Webhook_Details_Application_Header"),
      new SimpleTableHeader("Callback URL", "Webhook_Details_Callback_Header"),
      new SimpleTableHeader("Timestamp", "Webhook_Details_Timestamp_Header"),
      new SimpleTableHeader("Response code", "Webhook_Details_Response_Code_Header"),
      new SimpleTableHeader("Status", "Webhook_Details_Status_Header", "text-center"),
      new SimpleTableHeader("Tries", "Webhook_Details_Tries_Header"),
      new SimpleTableHeader("", "Webhook_Details_Header1")
    ]
  }

  get columns(): Array<TableColumn> {
    return [
      new SpanIdColumn("Webhook_Span_SpanId_Column"),
      new EntityColumn("Webhook_Span_Entity_Column"),
      new ApplicationColumn("Webhook_Span_Application_Column"),
      new CallbackColumn("Webhook_Span_Callback_Column"),
      new TimestampColumn("Webhook_Span_Timestamp_Column"),
      new ResponseCodeColumn("Webhook_Span_ResponseCode_Column"),
      new SpanStatusColumn("Webhook_Span_Status_Column"),
      new TriesColumn("Webhook_Span_Tries_Column"),
      new ContextMenuTableColumn(this.createSpanContextMenuItems()),
    ]
  }

  private createSpanContextMenuItems() {
    return [
      ContextMenuItemBuilder.create<Span, TraceSpansMenu>(TraceSpansMenu.VIEW_REQUEST).handler(this.viewRequest).build(),
      ContextMenuItemBuilder.create<Span, TraceSpansMenu>(TraceSpansMenu.VIEW_RESPONSE).handler(this.viewResponse).build(),
    ];
  }
}
