import {Component} from '@angular/core';
import {WebhookBaseComponent} from "../../../../common/webhook-base-component";
import {WebhooksContext} from "../../../../webhooks-context";
import * as $ from "jquery";

@Component({
  selector: 'app-webhook-detail',
  templateUrl: './webhook-detail.component.html',
  styleUrls: ['./webhook-detail.component.css']
})
export class WebhookDetailComponent extends WebhookBaseComponent {
  constructor(webhookContext: WebhooksContext) {
    super(webhookContext)
  }

  updated() {
    super.updated();

    $(function() {
      $(".body-accordion a").removeClass('active')
      $("div.main-body-collapse")
        .addClass("collapse")
        .removeClass('show')
    });
  }
}
