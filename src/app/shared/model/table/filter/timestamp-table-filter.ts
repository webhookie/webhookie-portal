import {BaseTableFilter} from "./table-filter";

export class TimestampTableFilter extends BaseTableFilter {
  constructor(
    clazz: string,
    name: string,
    title: string = "",
    public fromFilterName: string = "from",
    public toFilterName: string = "to"
  ) {
    super(clazz, name, title)
  }

}
