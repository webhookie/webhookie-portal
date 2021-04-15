export interface TrafficTableHeader {
  title: string;
  name: string;
  clazz: string;
}

export abstract class BaseTrafficTableHeader implements TrafficTableHeader {
  clazz: string = "text-nowrap";
  title: string = "";
  abstract name: string;
}

export class SimpleTrafficTableHeader implements TrafficTableHeader {
  constructor(
    public title: string,
    public name: string,
    public clazz: string = "",
  ) {
  }
}
