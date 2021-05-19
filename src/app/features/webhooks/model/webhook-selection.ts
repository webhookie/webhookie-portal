import {Topic, WebhookGroup} from "./webhook-group";
import {Webhook} from "./webhook";

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
