import {TableHeader} from "../components/generic-table/header/table-header";

export class TableSort {
  private constructor(
    public field: TableHeader,
    public order: SortOrder
  ) {
  }

  static asc(field: TableHeader): TableSort {
    return new TableSort(field, SortOrder.ASC);
  }

  static desc(field: TableHeader): TableSort {
    return new TableSort(field, SortOrder.DESC);
  }
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}
