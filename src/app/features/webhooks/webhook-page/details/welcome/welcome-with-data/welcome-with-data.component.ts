import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Topic, WebhookGroup} from "../../../../model/webhook-group";
import {ArrayUtils} from "../../../../../../shared/array-utils";
import {WebhooksContext} from "../../../../webhooks-context";
import {WebhookGroupElement} from "../../../sidebar/sidebar-list/webhook-group-element";
import {RouterService} from "../../../../../../shared/service/router.service";

@Component({
  selector: 'app-welcome-with-data',
  templateUrl: './welcome-with-data.component.html',
  styleUrls: ['./welcome-with-data.component.css']
})
export class WelcomeWithDataComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookGroup>>
  firstRow: Array<TopicEx> = []
  rest: Array<Array<TopicEx>> = []

  topics: Array<TopicEx> = []
  chunked: Array<Array<TopicEx>> = []

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
        let topicExList = wg.topics.map(t => new TopicEx(t, wg))
        this.topics.push(...topicExList)
      });

      this.chunked = ArrayUtils.chunkArray(this.topics, 3);
      this.firstRow = this.chunked[0];
      this.rest = this.chunked.slice(1, this.chunked.length);
    });
  }

  select(tx: TopicEx) {
    let group = WebhookGroupElement.create(tx.group);
    this.webhooksContext.selectTopic(group, tx.topic);
    this.webhooksContext._selectedWebhookGroup.next(group)
    this.routeService
      .navigateTo("webhooks/webhooks-page/webhook")
  }
}

class TopicEx {
  constructor(
    public topic: Topic,
    public group: WebhookGroup
  ) {
  }
}
