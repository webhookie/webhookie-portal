import {TrafficTableHeader} from "../../features/traffic/common/generic-table/header/traffic-table-header";

export class TableSort {
  private constructor(
    public field: TrafficTableHeader,
    public order: SortOrder
  ) {
  }

  static asc(field: TrafficTableHeader): TableSort {
    return new TableSort(field, SortOrder.ASC);
  }

  static desc(field: TrafficTableHeader): TableSort {
    return new TableSort(field, SortOrder.DESC);
  }
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}
