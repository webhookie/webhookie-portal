import {Component} from '@angular/core';
import {WebhooksContext} from "../../../../../webhooks-context";
import {WebhookBaseComponent} from "../../../../../common/webhook-base-component";

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent extends WebhookBaseComponent {
  constructor(ctx: WebhooksContext) {
    super(ctx)
  }
}
