import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {WebhookGroup} from "../../../../model/webhook-group";
import {ArrayUtils} from "../../../../../../shared/array-utils";
import {Webhook, WebhooksContext} from "../../../../webhooks-context";
import {RouterService} from "../../../../../../shared/service/router.service";

@Component({
  selector: 'app-welcome-with-data',
  templateUrl: './welcome-with-data.component.html',
  styleUrls: ['./welcome-with-data.component.css']
})
export class WelcomeWithDataComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookGroup>>
  firstRow: Array<Webhook> = []
  rest: Array<Array<Webhook>> = []

  topics: Array<Webhook> = []
  chunked: Array<Array<Webhook>> = []

  constructor(
    private readonly routeService: RouterService,
    private readonly webhooksContext: WebhooksContext
  ) { }

  ngOnInit(): void {
    this.firstRow = []
    this.rest = []
    this.topics = []

    this.items.subscribe(list => {
      list.forEach(wg => {
        let topicExList = wg.topics.map(t => new Webhook(wg, t))
        this.topics.push(...topicExList)
      });

      this.chunked = ArrayUtils.chunkArray(this.topics, 3);
      this.firstRow = this.chunked[0];
      this.rest = this.chunked.slice(1, this.chunked.length);
    });
  }

  select(webhook: Webhook) {
    this.webhooksContext.selectTopic(webhook);
    this.routeService
      .navigateTo("/webhooks/webhooks-page/webhook/webhook-detail")
  }
}
