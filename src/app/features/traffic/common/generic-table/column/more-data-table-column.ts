import {TableColumn} from "./table-column";

export abstract class MoreDataTableColumn<T> implements TableColumn {
  value(data: T): string {
    return "";
  }

  clazz: string = "";
  abstract name: string = "";

  abstract loadDetails(data: T): void;
}
