import {Topic, WebhookGroup} from "../../../model/webhook-group";

export class WebhookGroupElement {
  private constructor(
    public webhookGroup: WebhookGroup,
    public isShowing: boolean = false
  ) {
  }

  toggle() {
    this.isShowing = !this.isShowing;
  }

  hide() {
    this.isShowing = false;
  }

  get topics(): Array<Topic> {
    return this.webhookGroup.topics
  }

  get title(): string {
    return this.webhookGroup.title
  }

  static create(group: WebhookGroup): WebhookGroupElement {
    return new WebhookGroupElement(group);
  }
}
