import {TableColumn} from "./table-column";

export class SelectableTableColumn implements TableColumn {
  constructor(
    public clazz: string,
    public name: string
  ) {
  }

  value(data: any): string {
    return "";
  }
}
