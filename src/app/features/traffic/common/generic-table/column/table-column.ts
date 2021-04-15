export interface TableColumn {
  value(data: any): string;
  name: string;
  clazz: string;
}

export abstract class BaseTableColumn<T> implements TableColumn {
  abstract value(data: T): string;
  clazz: string = "";

  constructor(public name: string) {
  }
}

export abstract class NumberTableColumn<T> extends BaseTableColumn<T> {
  clazz: string = "text-center";
}
