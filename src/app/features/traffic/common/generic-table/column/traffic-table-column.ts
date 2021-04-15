export interface TrafficTableColumn {
  value(data: any): string;
  name: string;
  clazz: string;
}

export abstract class BaseTrafficColumn<T> implements TrafficTableColumn {
  abstract value(data: T): string;
  clazz: string = "";

  constructor(public name: string) {
  }
}

export abstract class NumberTrafficColumn<T> extends BaseTrafficColumn<T> {
  clazz: string = "text-center";
}
