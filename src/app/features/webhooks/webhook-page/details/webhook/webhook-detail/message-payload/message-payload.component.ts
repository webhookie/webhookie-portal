import {Component, Input} from '@angular/core';
import {MessagePayload} from "../../../../../model/message-payload";
import {StringUtils} from "../../../../../../../shared/string-utils";

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
    return StringUtils.encode(`${this.parentId}-${this.index}-${this.payload.name}`);
  }

  toggle($event: MouseEvent) {
    this.payload.toggleOpen();
    $event.preventDefault();
  }
}
