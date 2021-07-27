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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebhookRoutingModule} from './webhook-routing.module';
import {WebhookComponent} from './webhook.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {SupportComponent} from './support/support.component';
import {WebhookMenuComponent} from './webhook-menu/webhook-menu.component';
import {WebhookDetailComponent} from './webhook-detail/webhook-detail.component';
import {HeadersComponent} from './webhook-detail/headers/headers.component';
import {SecurityOptionsComponent} from './webhook-detail/security-options/security-options.component';
import {WebhookCommonModule} from '../../../common/webhook-common.module';
import {SharedModule} from "../../../../../shared/shared.module";
import {WebhookBaseComponent} from "../../../common/webhook-base-component";
import {MessagePayloadComponent} from './webhook-detail/message-payload/message-payload.component';

@NgModule({
  declarations: [
    WebhookComponent,
    ReviewsComponent,
    SupportComponent,
    WebhookMenuComponent,
    WebhookBaseComponent,
    WebhookDetailComponent,
    HeadersComponent,
    SecurityOptionsComponent,
    MessagePayloadComponent
  ],
  exports: [
    HeadersComponent,
    SecurityOptionsComponent
  ],
    imports: [
        CommonModule,
        WebhookRoutingModule,
        WebhookCommonModule,
        SharedModule
    ],
})
export class WebhookModule {
}
