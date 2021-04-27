import {TableDetailData} from "../../../shared/model/table/table-detail-data";

export class WebhookGroup extends TableDetailData {
  constructor(
    public id: string,
    public title: string,
    public version: string,
    public description: string,
    public spec: string,
    public topics: Array<Topic>,
    public consumerGroups: Array<string>,
    public providerGroups: Array<string>,
  ) {
    super();
  }
}

export class Topic {
  constructor(
    public name: string,
    public description: string
  ) {
  }
}
