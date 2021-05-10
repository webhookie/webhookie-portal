export class AccessGroup {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public iamGroupName: string,
    public enabled: boolean
  ) {
  }
}

export enum ConsumerAccess {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED"
}

export enum ProviderAccess {
  ALL = "ALL",
  RESTRICTED = "RESTRICTED"
}
