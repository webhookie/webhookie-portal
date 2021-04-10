import {TrafficTableColumn} from "./traffic-table-column";

export class SelectableTrafficColumn implements TrafficTableColumn {
  constructor(public clazz: string) {
  }

  value(data: any): string {
    return "";
  }
}
