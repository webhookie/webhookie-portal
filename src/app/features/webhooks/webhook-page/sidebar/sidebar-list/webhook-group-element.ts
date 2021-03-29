import {Topic} from "../../webhook-group";

export class WebhookGroupElement {
  constructor(
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
