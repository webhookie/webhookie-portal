import {AsyncAPIDocument, Channel, Message} from "@asyncapi/parser/dist/bundle";
import {Topic} from "./webhook-group";
import {MessageHeaders} from "./message-headers";
import {WebhookType} from "./webhook-type";
import {MessagePayload} from "./message/payload/message-payload";
import {MessagePayloadFactory} from "./message/payload/message-payload-factory";

export class Webhook {
  private readonly _message: Message
  readonly example: any;
  readonly headers: MessageHeaders = new MessageHeaders();
  readonly payload: MessagePayload;

  constructor(
    public id: string,
    public topic: Topic,
    public type: WebhookType = WebhookType.SUBSCRIBE,
    public channel: Channel
  ) {
    this._message = this.type == WebhookType.SUBSCRIBE
      ? this.channel.subscribe().message()
      : this.channel.publish().message()

    let payload = this._message.payload();
    this.payload = MessagePayloadFactory.create("Body", false, payload.json())

    let examples = payload.examples();
    // @ts-ignore
    this.example = examples ? examples : this.payload.example()

    if(this._message.headers()) {
      this.headers = new MessageHeaders(this._message.headers().json().properties);
    }
  }

  get hasHeaders(): boolean {
    return this.headers.hasHeaders;
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

