import {Component} from '@angular/core';
import {WebhookBaseComponent} from "../../webhook-base-component";
import {WebhooksContext} from "../../../webhooks-context";

@Component({
  selector: 'app-request-headers',
  templateUrl: './request-headers.component.html',
  styleUrls: ['./request-headers.component.css']
})
export class RequestHeadersComponent  extends WebhookBaseComponent {
  constructor(ctx: WebhooksContext) {
    super(ctx)
  }

  placeHolder(header: string): any {
    if(this.webhook.headers.format(header)) {
      return this.webhook.headers.format(header)
    }

    if(this.webhook.headers.type(header)) {
      return this.webhook.headers.type(header)
    }
  }

  value(header: string): any {
    if(this.webhook.headers.example(header)) {
      return this.webhook.headers.example(header)
    }

    return this.placeHolder(header)
  }
}
