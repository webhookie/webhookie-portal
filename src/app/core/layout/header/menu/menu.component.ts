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
import {WebhooksContext} from "../../../../features/webhooks/webhooks-context";
import {ApplicationContext} from "../../../../shared/application.context";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HealthService} from "../../../../shared/service/health.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private readonly appContext: ApplicationContext,
    private readonly healthService: HealthService,
    private readonly ctx: WebhooksContext
  ) {
  }

  get healthy(): Observable<boolean> {
    return this.healthService.healthy$
  }

  ngOnInit(): void {
  }

  clearContext() {
    this.ctx.clearWebhookSelection();
  }

  subscriptionsIsAvailable(): Observable<boolean> {
    return this.appContext.isUser;
  }

  trafficIsAvailable(): Observable<boolean> {
    return this.appContext.isUser;
  }

  hasAdminRole(): boolean {
    return this.appContext.hasAdminRole;
  }

  subscriptionsHomeLink(): Observable<string|undefined> {
    return this.roleHomeLink( "/subscriptions/consumer", "/subscriptions/provider")
  }

  trafficHomeLink(): Observable<string> {
    return this.roleHomeLink("/traffic/subscription", "/traffic/webhook")
  }

  private roleHomeLink(consumerHome: string, providerHome: string): Observable<string> {
    return this.appContext.loggedInUser$
      .pipe(
        map(it => {
          if(it.hasConsumerRole()) {
            return consumerHome
          }

          if(it.hasAdminRole() || it.hasProviderRole()) {
            return providerHome
          }

          return "/"
        })
      )
  }
}
