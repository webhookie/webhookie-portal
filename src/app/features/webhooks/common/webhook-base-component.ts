import {Component, OnInit} from "@angular/core";
import {WebhooksContext} from "../webhooks-context";
import {Webhook} from "../model/webhook";
import {distinctUntilChanged, filter} from "rxjs/operators";

@Component({
  selector: 'webhook-base',
  template: `works!`
  }
)
export class WebhookBaseComponent implements OnInit {
  webhook!: Webhook

  constructor(
    private readonly webhookContext: WebhooksContext
  ) {
    this.webhookContext.webhook$
      .pipe(
        filter(it => it != null),
        distinctUntilChanged()
      )
      .subscribe(it => this.webhook = it!.webhook);
  }

  ngOnInit(): void {
  }
}
