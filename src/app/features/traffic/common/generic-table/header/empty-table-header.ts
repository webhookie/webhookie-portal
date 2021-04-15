import {BaseTableHeader} from "./table-header";

export class EmptyTableHeader extends BaseTableHeader {
  constructor(clazz: string, public name: string) {
    super();

    this.clazz = `${super.clazz} ${clazz}`
  }
}
