export interface TrafficTableHeader {
  title: string;
  clazz: string;
}

export class BaseTrafficTableHeader implements TrafficTableHeader {
  clazz: string = "text-nowrap";
  title: string = "";
}
