import {BaseTableHeader} from "./table-header";

export class FilterTableHeader extends BaseTableHeader {
  constructor() {
    super();

    this.clazz = "filter text-center sticky-cell-opposite table-filters-collapse"
  }

  name: string = "Filter-Header";
}
