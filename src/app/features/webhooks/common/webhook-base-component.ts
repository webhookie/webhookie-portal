import {Component, OnInit} from "@angular/core";
import {WebhooksContext} from "../webhooks-context";
import {Webhook} from "../model/webhook";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {WebhookApi} from "../model/webhook-api";

@Component({
  selector: 'webhook-base',
  template: `works!`
  }
)
export class WebhookBaseComponent implements OnInit {
  webhook!: Webhook
  webhookApi!: WebhookApi

  constructor(
    private readonly webhookContext: WebhooksContext
  ) {
    this.webhookContext.webhook$
      .pipe(
        filter(it => it != null),
        distinctUntilChanged()
      )
      .subscribe(it => {
        this.webhook = it!.webhook
        this.webhookApi = it!.api
        this.updated();
      });
  }

  updated(): void {

  }

  ngOnInit(): void {
  }
}
