import {Component} from '@angular/core';
import {WebhookBaseComponent} from "../../webhook-base-component";
import {WebhooksContext} from "../../../webhooks-context";
import {MessageHeader} from "../../../model/webhook";

@Component({
  selector: 'app-request-headers',
  templateUrl: './request-headers.component.html',
  styleUrls: ['./request-headers.component.css']
})
export class RequestHeadersComponent  extends WebhookBaseComponent {
  constructor(ctx: WebhooksContext) {
    super(ctx)
  }

  placeHolder(header: MessageHeader): any {
    if(header.format()) {
      return header.format()
    }

    if(header.type()) {
      return header.type()
    }
  }

  value(header: MessageHeader): any {
    if(header.example()) {
      return header.example()
    }

    return this.placeHolder(header)
  }
}
