import {Channel} from "@asyncapi/parser/dist/bundle";
import {Topic, WebhookGroup} from "./webhook-group";

export class Webhook {
  constructor(
      public id: string,
      public topic: Topic,
      public type: WebhookType = WebhookType.SUBSCRIBE,
      public channel: Channel,
  ) {
  }

  static create(group: WebhookGroup, channel: Channel, name: string): Webhook {
    let type = channel.hasSubscribe() ? WebhookType.SUBSCRIBE : WebhookType.PUBLISH;
    let topic = new Topic(name, channel.description() ? channel.description()! : "");
    return new Webhook(group.id, topic, type, channel)
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
