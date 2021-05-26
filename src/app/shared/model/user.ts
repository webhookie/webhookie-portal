import {Constants} from "../constants";

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

  hasProviderRole(): boolean {
    return this.roles.includes(Constants.ROLE_WH_PROVIDER);
  }

  hasAdminRole(): boolean {
    return this.roles.includes(Constants.ROLE_WH_ADMIN);
  }

  hasConsumerRole(): boolean {
    return this.roles.includes(Constants.ROLE_WH_CONSUMER);
  }

  static UNKNOWN: User = new User("", [], [], [], "");
}
