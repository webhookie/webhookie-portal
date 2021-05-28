import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {WebhookGroup} from "../../../../model/webhook-group";
import {ArrayUtils} from "../../../../../../shared/array-utils";
import {WebhooksContext} from "../../../../webhooks-context";
import {RouterService} from "../../../../../../shared/service/router.service";
import {WebhookSelection} from "../../../../model/webhook-selection";
import {WebhookGroupService} from "../../../../service/webhook-group.service";

@Component({
  selector: 'app-welcome-with-data',
  templateUrl: './welcome-with-data.component.html',
  styleUrls: ['./welcome-with-data.component.css']
})
export class WelcomeWithDataComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookGroup>>
  firstRow: Array<WebhookSelection> = []
  rest: Array<Array<WebhookSelection>> = []

  topics: Array<WebhookSelection> = []
  chunked: Array<Array<WebhookSelection>> = []

  constructor(
    readonly service: WebhookGroupService,
    private readonly routeService: RouterService,
    private readonly webhooksContext: WebhooksContext
  ) {
  }

  ngOnInit(): void {
    this.firstRow = []
    this.rest = []
    this.topics = []

    this.items
      .subscribe(list => {
        let phrase = this.service.searchSubject$.value;
        list
          .filter(it => it.matches(phrase))
          .forEach(wg => {
            let topicExList = wg.webhooks
              .filter(it => it.topic.matches(phrase))
              .map(it => WebhookSelection.create(wg, it))
            this.topics.push(...topicExList)
          });

        this.chunked = ArrayUtils.chunkArray(this.topics, 3);
        this.firstRow = this.chunked[0];
        this.rest = this.chunked.slice(1, this.chunked.length);
      });
  }

  select(webhook: WebhookSelection) {
    this.webhooksContext.selectWebhook(webhook);
    this.routeService
      .navigateTo("/webhooks/webhooks-page/webhook/webhook-detail")
  }
}
