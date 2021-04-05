import {Component, OnInit} from '@angular/core';
import {VariableService} from '../variable.service';
import {ActivatedRoute} from '@angular/router';
import {WebhooksContext} from "../../webhooks-context";

@Component({
  selector: 'app-order-title',
  templateUrl: './order-title.component.html',
  styleUrls: ['./order-title.component.css']
})
export class OrderTitleComponent implements OnInit {
  orderTitle: any;

  constructor(
    public variable: VariableService,
    private readonly context: WebhooksContext,
    private route: ActivatedRoute,
  ) {
  }

  get topic() {
    return this.context.selectedTopic
  }

  ngOnInit(): void {
  }

  title() {
    let crumbs = this.variable.breadCrumbs();
    return crumbs[crumbs.length - 1].displayName;
  }

  webTitle() {
    if (this.context.selectedWebhook) {
      this.orderTitle = this.context.selectedWebhook;
    } else {
      this.route.paramMap.subscribe(params => {
        this.variable.sideBarList.forEach((item: any) => {
          item.subList.forEach((res: any) => {
            let webhook = params.get("webhookId");
            if (res.id == webhook) {
              this.orderTitle = res;
              this.context.selectedWebhook = res;
            }
          })
        })
      })
    }
    return this.orderTitle;
  }
}
