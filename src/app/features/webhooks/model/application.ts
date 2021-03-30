export class Application {
  constructor(
    public id: string,
    public name: string,
    public entity: string,
    public consumerIAMGroups: Array<string>,
    public description?: string
  ) {
  }
}
