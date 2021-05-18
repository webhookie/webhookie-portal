import {AsyncAPIDocument, Channel, Message, Schema} from "@asyncapi/parser/dist/bundle";
import {Topic, WebhookGroup} from "./webhook-group";

export class Webhook {
  private readonly _message: Message
  readonly headers: Array<MessageHeader> = [];
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

    if(this._message.headers()) {
      this.headers = Object.keys(this._message.headers().properties())
        .map(it => MessageHeader.create(it, this._message.header(it)))
    }
  }

  get hasHeaders(): boolean {
    return this.headers.length > 0;
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

export class MessageHeader {
  constructor(
    public name: string,
    public properties: any,
    public format: string,
    public example: any,
    public type: any,
    public description: string | null,
  ) {
  }

  static create(name: string, header: Schema): MessageHeader {
    return new MessageHeader(
      name,
      header.json(),
      header.format(),
      header.examples(),
      header.type(),
      header.description()
    )
  }
}
