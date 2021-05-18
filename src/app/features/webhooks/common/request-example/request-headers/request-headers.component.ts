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
}
