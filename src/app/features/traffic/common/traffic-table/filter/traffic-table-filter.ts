export interface TrafficTableFilter {
  clazz: string;
  title: string;
}

export class BaseTrafficTableFilter implements TrafficTableFilter {
  constructor(
    public clazz: string,
    public title: string = ""
  ) {
  }
}
