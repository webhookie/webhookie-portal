import {Component, OnInit} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhooksContext} from "../../../webhooks-context";
import {Topic, WebhookGroup} from "../../../model/webhook-group";
import {Webhook} from "../../../model/webhook";

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  readonly _webhooks$: Subject<Array<WebhookGroup>> = new ReplaySubject();

  constructor(
    private readonly service: WebhookGroupService,
    private readonly appContext: ApplicationContext,
    private readonly context: WebhooksContext
  ) {
  }

  ngOnInit(): void {
    this.appContext.isLoggedIn
      .pipe(mergeMap(() => this.readWebhookGroups()))
      .subscribe(it => this._webhooks$.next(it));

    this.context.webhook$
      .subscribe(it => {
        $(function () {
          $("#faq div.card-header a").removeClass("active")
          $("#faq div.collapse").removeClass("show")
          $("#faq div.collapse ul li a").removeClass("portionColor")
        });

        if(it != null) {
          let id = it.group.id;
          let bodyId = `faq${id}`
          let topicAId = this.topicId(it.topic)
          let groupAId = `group_a_${id}`
          $(function () {
            $(`#${bodyId}`).addClass("show");
            $(`#${groupAId}`).addClass("active");
            $(`#${topicAId}`).addClass("portionColor");
          });
        }

      })
  }

  selectTopic(element: WebhookGroup, topic: Topic) {
    this.context.selectTopic(Webhook.create(element, topic))
  }

  private readWebhookGroups(): Observable<Array<WebhookGroup>> {
    return this.service.myWebhookGroups();
  }

  clearSelection() {
    this.context.clearWebhookSelection()
  }

  topicIsNotSelected(): boolean {
    return this.context.selectedTopic == undefined
  }

  topicId(topic: Topic): string {
    return `topic_a_${topic.name.replace(/\//g, "_")}`
  }
}
