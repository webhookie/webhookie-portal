import {TrafficTableColumn} from "./traffic-table-column";

export abstract class MoreDataTrafficColumn<T> implements TrafficTableColumn {
  value(data: T): string {
    return "";
  }

  clazz: string = "";

  abstract loadDetails(data: T): void;
}
