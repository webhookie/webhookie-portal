import {Topic, WebhookGroup} from "../../../model/webhook-group";

export class WebhookGroupElement {
  constructor(
    public webhookGroup: WebhookGroup,
    public title: string,
    public topics: Array<Topic>,
    public isShowing: boolean = false
  ) {
  }

  toggle() {
    this.isShowing = !this.isShowing;
  }

  hide() {
    this.isShowing = false;
  }
}
