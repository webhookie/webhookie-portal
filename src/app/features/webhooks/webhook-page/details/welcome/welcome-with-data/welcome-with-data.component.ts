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

import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {WebhookApi} from "../../../../model/webhook-api";
import {ArrayUtils} from "../../../../../../shared/array-utils";
import {WebhooksContext} from "../../../../webhooks-context";
import {RouterService} from "../../../../../../shared/service/router.service";
import {WebhookSelection} from "../../../../model/webhook-selection";
import {WebhookApiService} from "../../../../service/webhook-api.service";
import {Branding, BrandingService} from "../../../../../../shared/service/branding.service";

@Component({
  selector: 'app-welcome-with-data',
  templateUrl: './welcome-with-data.component.html',
  styleUrls: ['./welcome-with-data.component.css']
})
export class WelcomeWithDataComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookApi>>
  firstRow: Array<WebhookSelection> = []
  rest: Array<Array<WebhookSelection>> = []

  topics: Array<WebhookSelection> = []
  chunked: Array<Array<WebhookSelection>> = []

  constructor(
    readonly service: WebhookApiService,
    private readonly brandingService: BrandingService,
    private readonly routeService: RouterService,
    private readonly webhooksContext: WebhooksContext
  ) {
  }

  get branding(): Branding {
    return this.brandingService.branding;
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
