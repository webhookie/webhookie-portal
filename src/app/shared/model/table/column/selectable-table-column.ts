import {TableColumn} from "./table-column";
import {TableData} from "../table-data";

export class SelectableTableColumn<T extends TableData> implements TableColumn {
  constructor(
    public clazz: string,
    public name: string,
    public isSelectablePredicate: (data: T) => boolean = () => true
  ) {
  }

  value(data: any): string {
    return "";
  }

  isSelectable(data: T): boolean {
    return this.isSelectablePredicate(data)
  }
}
