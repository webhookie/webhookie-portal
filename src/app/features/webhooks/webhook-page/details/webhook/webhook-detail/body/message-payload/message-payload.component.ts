import {Component, Input, OnInit} from '@angular/core';
import {MessagePayload} from "../../../../../../model/message-payload";

@Component({
  selector: 'app-message-payload',
  templateUrl: './message-payload.component.html',
  styleUrls: ['./message-payload.component.css']
})
export class MessagePayloadComponent implements OnInit {
  @Input() payload!: MessagePayload
  @Input() index: number = 0;
  @Input() parentId!: string

  constructor() { }

  ngOnInit(): void {
  }

}
