import {BaseTrafficTableHeader} from "./traffic-table-header";

export class SelectableTrafficHeader extends BaseTrafficTableHeader {
  constructor(clazz: string) {
    super();

    this.clazz = `${super.clazz} ${clazz}`
  }
}
