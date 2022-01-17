/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {WebhooksContext} from "../webhooks-context";
import {filter, mergeMap} from "rxjs/operators";
import {SubscriptionService} from "../../../shared/service/subscription.service";
import {ActivatedRoute} from "@angular/router";
import {WebhookBaseComponent} from "../common/webhook-base-component";
import {LogService} from "../../../shared/service/log.service";
import {SubscriptionWizardComponent} from "./subscription-wizard/subscription-wizard.component";

@Component({
  selector: 'app-subscribe-webhook',
  templateUrl: './subscribe-webhook.component.html',
  styleUrls: ['./subscribe-webhook.component.css']
})
export class SubscribeWebhookComponent extends WebhookBaseComponent implements AfterViewInit {
  @ViewChild("wizardComponent") wizardComponent!: SubscriptionWizardComponent

  constructor(
    private readonly log: LogService,
    private readonly context: WebhooksContext,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subscriptionService: SubscriptionService,
  ) {
    super(context)
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams
      .pipe(
        filter(it => it.subscriptionId != null),
        mergeMap(it => this.subscriptionService.fetchSubscription(it.subscriptionId))
      )
      .subscribe(it => this.wizardComponent.prepareForEdit(it));
  }

  title() {
    return `Subscribe to ${this.webhook.topic.name} webhook`
  }
}
