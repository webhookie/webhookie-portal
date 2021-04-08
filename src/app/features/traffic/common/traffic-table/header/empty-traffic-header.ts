import {BaseTrafficTableHeader} from "./traffic-table-header";

export class EmptyTrafficHeader extends BaseTrafficTableHeader {
  constructor(clazz: string) {
    super();

    this.clazz = `${super.clazz} ${clazz}`
  }
}
