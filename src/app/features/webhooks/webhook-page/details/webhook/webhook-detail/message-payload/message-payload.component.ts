import {Component, Input} from '@angular/core';
import {StringUtils} from "../../../../../../../shared/string-utils";
import {WebhookPayloadElement} from "./webhook-payload-element";

@Component({
  selector: 'app-message-payload',
  templateUrl: './message-payload.component.html',
  styleUrls: ['./message-payload.component.css']
})
export class MessagePayloadComponent {
  @Input() element!: WebhookPayloadElement
  @Input() index: number = 0;
  @Input() parentId!: string
  @Input() _length: number = 0;
  
  get id() {
    return StringUtils.encode(`${this.parentId}-${this.index}-${this.element.payload.name}`);
  }

  toggle($event: MouseEvent) {
    this.element.toggleOpen();
    $event.preventDefault();
  }
}
