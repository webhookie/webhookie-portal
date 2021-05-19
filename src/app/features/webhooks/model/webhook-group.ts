import {TableDetailData} from "../../../shared/model/table/table-detail-data";
import {ConsumerAccess, ProviderAccess} from "../../../shared/model/access-group";
import {Webhook} from "./webhook";
import {AsyncAPIDocument, SecurityScheme} from "@asyncapi/parser/dist/bundle";
import {WebhookType} from "./webhook-type";

export class WebhookGroup extends TableDetailData {
  private readonly _securityOptions: Array<SecurityOption> = [];

  readonly securityOptions = this._securityOptions
    .filter(it => it.type == "symmetricEncryption");

  readonly webhooks: Array<Webhook> = this._webhooks
      .filter(it => it.type == WebhookType.SUBSCRIBE)

  constructor(
    public id: string,
    public title: string,
    public version: string,
    public description: string,
    public spec: string,
    private _webhooks: Array<Webhook>,
    public consumerAccess: ConsumerAccess,
    public consumerGroups: Array<string>,
    public providerAccess: ProviderAccess,
    public providerGroups: Array<string>,
    doc: AsyncAPIDocument
  ) {
    super();

    let components = doc.components();
    this._securityOptions = Object.keys(components.securitySchemes())
      .map(name => SecurityOption.create(name, components.securityScheme(name)))
  }

  get hasSecuritySchema(): boolean {
    return this.securityOptions.length > 0
  }

  static create(item: any, doc: AsyncAPIDocument): WebhookGroup {
    let webhooks = doc.channelNames()
      .map(name => Webhook.create(item.id, doc, name))

    return new WebhookGroup(
      item.id,
      item.title,
      item.webhookVersion,
      item.description,
      item.raw,
      webhooks,
      item.consumerAccess,
      item.consumerGroups,
      item.providerAccess,
      item.providerGroups,
      doc
    );
  }
}

export class Topic {
  constructor(
    public name: string,
    public description: string
  ) {
  }
}

export class SecurityOption {
  constructor(
    public name: string,
    public properties: any,
    public type: any,
    public description: string | null,
  ) {
  }

  static create(name: string, schema: SecurityScheme): SecurityOption {
    return new SecurityOption(
      name,
      schema.json(),
      schema.type(),
      schema.description()
    )
  }
}
