import {Component, Input} from '@angular/core';
import {MessagePayload} from "../../../../../model/message-payload";

@Component({
  selector: 'app-message-payload',
  templateUrl: './message-payload.component.html',
  styleUrls: ['./message-payload.component.css']
})
export class MessagePayloadComponent {
  @Input() payload!: MessagePayload
  @Input() index: number = 0;
  @Input() parentId!: string

  get id() {
    return `${this.parentId}-${this.index}-${this.payload.name}-`
  }

  toggle($event: MouseEvent) {
    this.payload.toggleOpen();
    $event.preventDefault();
  }

  reset() {
    this.payload.close();
  }
}
