import {AsyncAPIDocument, Channel, Message, Schema} from "@asyncapi/parser/dist/bundle";
import {Topic, WebhookGroup} from "./webhook-group";
import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema"

export class Webhook {
  private readonly _message: Message
  readonly example: any;
  readonly headers: MessageHeaders = new MessageHeaders();

  constructor(
    public id: string,
    public topic: Topic,
    public type: WebhookType = WebhookType.SUBSCRIBE,
    public channel: Channel
  ) {
    let op = this.type == WebhookType.SUBSCRIBE
      ? this.channel.subscribe()
      : this.channel.publish()

    this._message = op.message()

    let examples = this._message.payload().examples();
    // @ts-ignore
    this.example = examples ? examples : sampler.generateExampleSchema(this.payload.json())

    if(this._message.headers()) {
      this.headers = new MessageHeaders(this._message.headers().json().properties);
    }
  }

  get hasHeaders(): boolean {
    return this.headers.hasHeaders;
  }

  get payload(): Schema {
    return this._message.payload()
  }

  get contentType(): string {
    return this._message.contentType()
  }

  static create(groupId: string, doc: AsyncAPIDocument, name: string): Webhook {
    let channel = doc.channel(name)
    let type = channel.hasSubscribe() ? WebhookType.SUBSCRIBE : WebhookType.PUBLISH;
    let topic = new Topic(name, channel.description() ? channel.description()! : "");
    return new Webhook(groupId, topic, type, channel)
  }
}

export enum WebhookType {
  SUBSCRIBE,
  PUBLISH
}

export class WebhookSelection {
  constructor(
    public group: WebhookGroup,
    public webhook: Webhook
  ) {
  }

  get topic(): Topic {
    return this.webhook.topic
  }

  static create(group: WebhookGroup, webhook: Webhook): WebhookSelection {
    return new WebhookSelection(group, webhook);
  }

  static createByTopic(group: WebhookGroup, topic: string): WebhookSelection {
    let webhook = group.webhooks.filter(it => it.topic.name == topic)[0];
    return WebhookSelection.create(group, webhook);
  }
}

export class MessageHeaders {
  readonly keys: Array<string>

  get hasHeaders(): boolean {
    return this.keys.length > 0;
  }

  header(name: string): any {
    return this._headers[name];
  }

  headerKeys(name: string): any {
    return Object.keys(this.header(name))
      .filter(it => it != "x-parser-schema-id")
  }

  headerPropValue(name: string, prop: string): any {
    return this.header(name)[prop]
  }

  description(name: string): any {
    return this.headerPropValue(name, "description")
  }

  format(name: string): any {
    return this.headerPropValue(name, "format")
  }

  type(name: string): any {
    return this.headerPropValue(name, "type")
  }

  example(name: string): any {
    return sampler.generateExampleSchema(this.header(name))
  }

  constructor(
    private readonly _headers: any = {}
  ) {
    this.keys = Object.keys(_headers);
  }
}
