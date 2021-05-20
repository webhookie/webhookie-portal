/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 20/5/21 19:37
 */
import {MessagePayload} from "../../../../../model/message-payload";

export class WebhookPayloadElement {
  open: boolean = false;
  nestedElements: Array<WebhookPayloadElement>;

  constructor(public payload: MessagePayload,) {
    this.nestedElements = this.payload.nestedObjects
      .map(it => new WebhookPayloadElement(it));
  }

  get hasChildAttributes(): boolean {
    return (this.payload.keys.length > 0 && (this.payload.message != undefined)) || this.nestedElements.length > 0
  }

  get emptyAttributes(): boolean {
    return !this.hasChildAttributes
  }

  toggleOpen() {
    this.open = !this.open;
  }

  close() {
    this.nestedElements.forEach(it => it.close());
    this.open = false;
  }
}
