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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscribeWebhookComponent} from './subscribe-webhook/subscribe-webhook.component';
import {WebhookPageComponent} from './webhook-page/webhook-page.component';
import {CallbackTestComponent} from "./callback-test/callback-test.component";
import {CanActivateSubscribe} from "./service/can-activate-subscribe";
import {EditWebhookApiComponent} from "./webhook-page/webhook-form/edit-webhook-api/edit-webhook-api.component";
import {CreateWebhookApiComponent} from "./webhook-page/webhook-form/create-webhook-api/create-webhook-api.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "webhooks-page",
    pathMatch: "full"
  },
  {
    path: 'webhooks-page',
    component: WebhookPageComponent,
    loadChildren: () => import('./webhook-page/webhook-page.module').then(m => m.WebhookPageModule),
  },
  {
    path: 'callback-test',
    component: CallbackTestComponent,
    data: {
      breadcrumb: 'Test webhook'
    },
    canActivate: [CanActivateSubscribe]
  },
  {
    path: 'subscribe-webhook',
    component: SubscribeWebhookComponent,
    data: {
      breadcrumb: 'Subscribe to webhook'
    },
    canActivate: [CanActivateSubscribe]
  },
  {
    path: 'create-webhook',
    component: CreateWebhookApiComponent,
    data: {
        breadcrumb: 'Create new webhook API',
    },
  },
  {
    path: 'edit-webhook-api',
    component: EditWebhookApiComponent,
    data: {
      breadcrumb: 'Update webhook API',
    },
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebhooksRoutingModule {
}
