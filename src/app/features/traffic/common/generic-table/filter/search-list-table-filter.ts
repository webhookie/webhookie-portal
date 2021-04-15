import {BaseTableFilter} from "./table-filter";

export class SearchListTableFilter extends BaseTableFilter {
  constructor(
    public clazz: string,
    public name: string,
    public title: string = "",
    public list: any
  ) {
    super(clazz, name, title);
  }
}
