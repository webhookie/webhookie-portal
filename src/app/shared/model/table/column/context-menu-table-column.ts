import {TableColumn} from "./table-column";
import {TableData} from "../table-data";
import {ContextMenuItem} from "./context-menu-item";

export class ContextMenuTableColumn<T extends TableData, E> implements TableColumn {
  constructor(
    public items: Array<ContextMenuItem<T, E>>
  ) {
  }

  value(data: any): string {
    return "";
  }

  clazz: string = "dropdown text-center sticky-cell-opposite";
  name: string = "";
}

