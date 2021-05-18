import {AsyncapiParserService} from "../../../shared/service/asyncapi-parser.service";
import {AsyncAPIDocument, Channel, Message, Schema} from "@asyncapi/parser/dist/bundle";
import {Topic, WebhookGroup} from "./webhook-group";

export class Webhook {
  private readonly parser = new AsyncapiParserService();
  doc!: AsyncAPIDocument
  channel!: Channel
  type!: WebhookType
  message?: Message
  payload?: Schema
  headers?: Schema

  constructor(
      public group: WebhookGroup,
      public topic: Topic
  ) {
    this.parser.parse(group.spec)
        .subscribe(it => {
          this.doc = it;
          this.channel = it.channel(this.topic.name);
          if (this.channel.hasSubscribe()) {
            this.type = WebhookType.SUBSCRIBE
            this.message = this.channel.subscribe().message()
            this.payload = this.message.payload()
            this.headers = this.message.headers()
          } else {
            this.type = WebhookType.PUBLISH
          }
        })
  }

  static create(group: WebhookGroup, topic: Topic | null = null): Webhook {
    return new Webhook(group, topic ? topic : group.topics[0]);
  }
}

export enum WebhookType {
  SUBSCRIBE,
  PUBLISH
}
