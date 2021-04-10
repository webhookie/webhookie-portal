export interface TrafficTableColumn {
  value(data: any): string;
  clazz: string;
}

export abstract class BaseTrafficColumn<T> implements TrafficTableColumn {
  abstract value(data: T): string;
  clazz: string = "";
}

export abstract class NumberTrafficColumn<T> extends BaseTrafficColumn<T> {
  clazz: string = "text-center";
}
