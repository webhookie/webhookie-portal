import {BaseTableData} from "./table/table-data";

export class AccessGroup extends BaseTableData {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public iamGroupName: string,
    public enabled: boolean
  ) {
    super();
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
