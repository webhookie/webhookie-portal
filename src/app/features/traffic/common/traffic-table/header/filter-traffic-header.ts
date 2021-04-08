import {BaseTrafficTableHeader} from "./traffic-table-header";

export class FilterTrafficHeader extends BaseTrafficTableHeader {
  constructor() {
    super();

    this.clazz = "filter text-center sticky-cell-opposite table-filters-collapse"
  }
}
