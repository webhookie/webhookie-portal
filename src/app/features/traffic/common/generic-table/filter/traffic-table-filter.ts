export interface TrafficTableFilter {
  clazz: string;
  title: string;
  name: string;
}

export class BaseTrafficTableFilter implements TrafficTableFilter {
  constructor(
    public clazz: string,
    public name: string,
    public title: string = ""
  ) {
  }
}
