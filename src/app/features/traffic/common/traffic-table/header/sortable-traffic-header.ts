import {BaseTrafficTableHeader} from "./traffic-table-header";

export class SortableTrafficHeader extends BaseTrafficTableHeader {
  constructor(
    public title: string,
    public name: string,
    clazz?: string
  ) {
    super();

    this.clazz = `${super.clazz} dropdown`
    if(clazz) {
      this.clazz = `${super.clazz} ${clazz}`
    }
  }
}
