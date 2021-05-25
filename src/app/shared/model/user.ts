export class User {
  constructor(
    public entity: string,
    public consumerGroups: Array<string>,
    public providerGroups: Array<string>,
    public roles: Array<string>,
    public subject: string
  ) {
  }

  get groups(): Array<string> {
    return this.consumerGroups.concat(...this.providerGroups)
  }

  static UNKNOWN: User = new User("", [], [], [], "");
}
