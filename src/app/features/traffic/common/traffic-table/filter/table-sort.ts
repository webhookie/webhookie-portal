import {TrafficTableHeader} from "../header/traffic-table-header";

export interface TableSort {
  field: TrafficTableHeader,
  order: SortOrder
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}
