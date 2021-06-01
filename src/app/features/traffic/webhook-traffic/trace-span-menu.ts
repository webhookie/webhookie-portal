/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 1/6/21 11:50
 */

import {ContextMenuItem} from "../../../shared/model/table/column/context-menu-item";
import {Span} from "../model/span";

export enum TraceSpansMenu {
  VIEW_REQUEST = "View Request",
  VIEW_RESPONSE = "View Response",
}

export type TraceSpanContextMenu = ContextMenuItem<Span, TraceSpansMenu>;

