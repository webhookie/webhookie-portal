export interface TrafficTableHeader {
  title: string;
  clazz: string;
}

export class BaseTrafficTableHeader implements TrafficTableHeader {
  clazz: string = "text-nowrap";
  title: string = "";
}

export class SimpleTrafficTableHeader implements TrafficTableHeader {
  constructor(
    public title: string,
    public clazz: string = "",
  ) {
  }
}
