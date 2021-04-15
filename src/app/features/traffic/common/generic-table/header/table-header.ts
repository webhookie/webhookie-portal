export interface TableHeader {
  title: string;
  name: string;
  clazz: string;
}

export abstract class BaseTableHeader implements TableHeader {
  clazz: string = "text-nowrap";
  title: string = "";
  abstract name: string;
}

export class SimpleTableHeader implements TableHeader {
  constructor(
    public title: string,
    public name: string,
    public clazz: string = "",
  ) {
  }
}
