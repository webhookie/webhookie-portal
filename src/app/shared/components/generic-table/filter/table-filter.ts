export interface TableFilter {
  clazz: string;
  title: string;
  name: string;
}

export class BaseTableFilter implements TableFilter {
  constructor(
    public clazz: string,
    public name: string,
    public title: string = ""
  ) {
  }
}
