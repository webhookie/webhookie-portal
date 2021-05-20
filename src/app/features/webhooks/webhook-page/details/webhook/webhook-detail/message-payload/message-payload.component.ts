import {Component, Input, OnInit} from '@angular/core';
import {MessagePayload} from "../../../../../model/message-payload";
import * as $ from "jquery";

@Component({
  selector: 'app-message-payload',
  templateUrl: './message-payload.component.html',
  styleUrls: ['./message-payload.component.css']
})
export class MessagePayloadComponent implements OnInit {
  @Input() payload!: MessagePayload
  @Input() index: number = 0;
  @Input() parentId!: string

  ngOnInit(): void {
    $(function() {
      $(".body-accordion > div > div > a").on("click", function () {
        $(this).toggleClass('active')
      });
    });
  }
}
