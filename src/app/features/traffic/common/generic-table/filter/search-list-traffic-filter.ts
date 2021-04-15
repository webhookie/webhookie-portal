import {BaseTrafficTableFilter} from "./traffic-table-filter";

export class SearchListTrafficFilter extends BaseTrafficTableFilter {
  constructor(
    public clazz: string,
    public name: string,
    public title: string = "",
    public list: any
  ) {
    super(clazz, name, title);
  }
}
