import {Component, OnInit} from "@angular/core";
import {WebhooksContext} from "../webhooks-context";
import {Webhook} from "../model/webhook";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {WebhookGroup} from "../model/webhook-group";

@Component({
  selector: 'webhook-base',
  template: `works!`
  }
)
export class WebhookBaseComponent implements OnInit {
  webhook!: Webhook
  webhookGroup!: WebhookGroup

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
        this.webhookGroup = it!.group
        this.updated();
      });
  }

  updated(): void {

  }

  ngOnInit(): void {
  }
}
