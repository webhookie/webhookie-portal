import {AsyncAPIDocument, Channel, Message} from "@asyncapi/parser/dist/bundle";
import {Topic} from "./webhook-group";
import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema"
import {MessageHeaders} from "./message-headers";
import {WebhookType} from "./webhook-type";

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
    this.example = examples ? examples : sampler.generateExampleSchema(this.payload)

    if(this._message.headers()) {
      this.headers = new MessageHeaders(this._message.headers().json().properties);
    }
  }

  get hasHeaders(): boolean {
    return this.headers.hasHeaders;
  }

  get payload(): any {
    return this._message.payload().json()
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

