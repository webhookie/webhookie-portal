import {Component} from '@angular/core';
import {WebhookBaseComponent} from "../../../../common/webhook-base-component";
import {WebhooksContext} from "../../../../webhooks-context";
import * as $ from "jquery";
import {WebhookPayloadElement} from "./message-payload/webhook-payload-element";
import {StringUtils} from "../../../../../../shared/string-utils";

@Component({
  selector: 'app-webhook-detail',
  templateUrl: './webhook-detail.component.html',
  styleUrls: ['./webhook-detail.component.css']
})
export class WebhookDetailComponent extends WebhookBaseComponent {
  constructor(webhookContext: WebhooksContext) {
    super(webhookContext)
  }

  element!: WebhookPayloadElement

  ngOnInit() {
    super.ngOnInit();

    this.element = new WebhookPayloadElement(this.webhook.payload);
  }

  get prefix(): string {
    return StringUtils.encode(this.webhook.topic.name);
  }

  updated() {
    super.updated();
    this.element = new WebhookPayloadElement(this.webhook.payload);

    $(function() {
      $("div.main-body-collapse")
        .addClass("collapse")
        .removeClass('show')
    });
  }
}
