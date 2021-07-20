import {Component, OnInit} from '@angular/core';
import {WebhookApiService} from "../../../service/webhook-api.service";
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhooksContext} from "../../../webhooks-context";
import {WebhookApi} from "../../../model/webhook-api";
import {Webhook} from "../../../model/webhook";
import {WebhookSelection} from "../../../model/webhook-selection";
import * as $ from "jquery";
import {StringUtils} from "../../../../../shared/string-utils";
import {LogService} from "../../../../../shared/service/log.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  constructor(
    readonly service: WebhookApiService,
    private readonly log: LogService,
    private readonly appContext: ApplicationContext,
    private readonly context: WebhooksContext
  ) {
  }

  ngOnInit(): void {
    this.context.webhook$
      .subscribe(it => {
        $(function () {
          $("#faq div.card-header a").removeClass("active")
          $("#faq div.collapse").removeClass("show")
          $("#faq div.collapse ul li a").removeClass("portionColor")
        });

        if(it != null) {
          let id = it.api.id;
          let bodyId = `faq${id}`
          let webhookAId = this.webhookId(it.webhook)
          let groupAId = `group_a_${id}`
          $(function () {
            $(`#${bodyId}`).addClass("show");
            $(`#${groupAId}`).addClass("active");
            $(`#${webhookAId}`).addClass("portionColor");
          });
        }

      })

    $(function() {
      $(".btn-header-link").on("click", function () {
        $(this)
          .toggleClass("active")
          .parent().parent().siblings().find('.btn-header-link')
          .removeClass('active')
      });
    });
  }

  selectWebhook(element: WebhookApi, webhook: Webhook) {
    this.context.selectWebhook(WebhookSelection.create(element, webhook))
  }

  clearSelection() {
    this.context.clearWebhookSelection()
  }

  topicIsNotSelected(): boolean {
    return this.context.selectedTopic == undefined
  }

  webhookId(webhook: Webhook): string {
    return `webhook_a_${StringUtils.encode(webhook.topic.name)}`
  }

  get webhooks$(): Observable<Array<WebhookApi>> {
    return this.service.filteredWebhook$
  }
}
