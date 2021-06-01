/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 1/6/21 11:52
 */

import {ContextMenuItem} from "../../../shared/model/table/column/context-menu-item";
import {Trace} from "../model/trace";

export enum TraceMenu {
  VIEW_REQUEST = "View Request"
}

export type TraceContextMenu = ContextMenuItem<Trace, TraceMenu>;
