import {Topic, WebhookApi} from "./webhook-api";
import {Webhook} from "./webhook";

export class WebhookSelection {
  constructor(
    public api: WebhookApi,
    public webhook: Webhook
  ) {
  }

  get topic(): Topic {
    return this.webhook.topic
  }

  static create(api: WebhookApi, webhook: Webhook): WebhookSelection {
    return new WebhookSelection(api, webhook);
  }

  static createByTopic(api: WebhookApi, topic: string): WebhookSelection {
    let webhook = api.webhooks.filter(it => it.topic.name == topic)[0];
    return WebhookSelection.create(api, webhook);
  }
}
