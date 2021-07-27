/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
