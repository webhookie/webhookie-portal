import {Channel, Message} from "@asyncapi/parser/dist/bundle";
import {Topic} from "./webhook-api";
import {MessageHeaders} from "./message-headers";
import {WebhookType} from "./webhook-type";
import {MessagePayload} from "./message/payload/message-payload";
import {MessagePayloadFactory} from "./message/payload/message-payload-factory";

export class Webhook {
  private readonly _message: Message
  readonly example: any;
  readonly headers: MessageHeaders = new MessageHeaders();
  readonly payload: MessagePayload;
  readonly contentType?: string;

  constructor(
    public id: string,
    public topic: Topic,
    public numberOfSubscriptions: number,
    public type: WebhookType = WebhookType.SUBSCRIBE,
    public channel: Channel,
    _defaultContentType: string | null
  ) {
    this._message = this.type == WebhookType.SUBSCRIBE
      ? this.channel.subscribe().message()
      : this.channel.publish().message()

    let payload = this._message.payload();
    this.payload = MessagePayloadFactory.create("Body", false, payload.json())

    let examples = payload.examples();
    // @ts-ignore
    this.example = examples ? examples : this.payload.example()

    if(this._message.contentType() != undefined) {
      this.contentType = this._message.contentType();
    } else if(_defaultContentType != null) {
      this.contentType = _defaultContentType!
    }

    let messageHeaders = this._message.headers() ? this._message.headers().json().properties : {}
    this.headers = new MessageHeaders(messageHeaders);
    if(this.contentType) {
      this.headers.setContentType(this.contentType);
    }
  }

  get hasHeaders(): boolean {
    return this.headers.hasHeaders;
  }

  contentTypeHeader(): any {
    if(this.contentType) {
      return {
        "Content-Type": this.contentType
      };
    }

    return {};
  }
}

