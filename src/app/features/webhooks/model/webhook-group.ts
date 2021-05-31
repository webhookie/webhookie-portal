import {TableDetailData} from "../../../shared/model/table/table-detail-data";
import {ConsumerAccess, ProviderAccess} from "../../../shared/model/access-group";
import {Webhook} from "./webhook";
import {AsyncAPIDocument, SecurityScheme} from "@asyncapi/parser/dist/bundle";
import {WebhookType} from "./webhook-type";
import {StringUtils} from "../../../shared/string-utils";

export class WebhookGroup extends TableDetailData {
  private readonly _securityOptions: Array<SecurityOption> = [];

  get securityOptions() {
    return this._securityOptions
      .filter(it => it.type == "symmetricEncryption");
  }

  get webhooks(): Array<Webhook> {
    return this._webhooks
      .filter(it => it.type == WebhookType.SUBSCRIBE)
  }

  get numberOfSubscriptions(): number {
    return this.webhooks.map(it => it.numberOfSubscriptions)
      .reduce((value: number, current: number) => {
        return value + current;
      });
  }

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
    public info: WebhookApiInfo,
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

  static create(item: any, webhooks: Array<Webhook>, doc: AsyncAPIDocument): WebhookGroup {
    let license = doc.info().license();
    let info: WebhookApiInfo = {
      termsOfService: doc.info().termsOfService(),
      license: {
        name: license?.name(),
        url: license?.url()
      }
    }

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
      info,
      doc
    );
  }

  matches(phrase: string): boolean {
    if(StringUtils.matchesIn(this.title, phrase)) {
      return true;
    }

    return this.webhooks.map(it => it.topic)
      .some(it => it.matches(phrase))
  }
}

export class Topic {
  constructor(
    public name: string,
    public description: string
  ) {
  }

  matches(value: string): boolean {
    return StringUtils.matchesIn(this.name, value);
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

export interface WebhookApiInfo {
  termsOfService?: string
  license?: WebhookApiLicense
}

export interface WebhookApiLicense {
  name: string,
  url: string
}
