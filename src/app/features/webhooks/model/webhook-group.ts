import {TableDetailData} from "../../../shared/model/table/table-detail-data";
import {ConsumerAccess, ProviderAccess} from "../../../shared/model/access-group";
import {Webhook} from "./webhook";

export class WebhookGroup extends TableDetailData {
  constructor(
    public id: string,
    public title: string,
    public version: string,
    public description: string,
    public spec: string,
    public webhooks: Array<Webhook>,
    public consumerAccess: ConsumerAccess,
    public consumerGroups: Array<string>,
    public providerAccess: ProviderAccess,
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
