import {Component} from '@angular/core';
import {WebhookBaseComponent} from "../../../../../common/webhook-base-component";
import {WebhooksContext} from "../../../../../webhooks-context";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent extends WebhookBaseComponent {
  constructor(webhookContext: WebhooksContext) {
    super(webhookContext)
  }
}
