import {BaseTableHeader} from "./table-header";

export class SortableTableHeader extends BaseTableHeader {
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
