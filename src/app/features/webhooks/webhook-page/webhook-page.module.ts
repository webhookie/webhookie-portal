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

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { DetailsComponent } from './details/details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarSearchComponent } from './sidebar/sidebar-search/sidebar-search.component';
import { TitleToggleComponent } from './sidebar/title-toggle/title-toggle.component';
import { SidebarListComponent } from './sidebar/sidebar-list/sidebar-list.component';
import { WebhookPageComponent } from './webhook-page.component';
import { WebhookPageRoutingModule } from './webhook-page-routing.module';
import { WebhookModule } from './details/webhook/webhook.module'
import { WebhookCommonModule } from '../common/webhook-common.module';
import { WebhookFormComponent } from './webhook-form/webhook-form.component';
import { WelcomeComponent } from './details/welcome/welcome.component';
import { WelcomeWithDataComponent } from './details/welcome/welcome-with-data/welcome-with-data.component';
import {MonacoEditorModule} from "@materia-ui/ngx-monaco-editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import { WebhookAccessGroupComponent } from './webhook-form/webhook-access-group/webhook-access-group.component';
import {NgbAlertModule, NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import { CreateWebhookApiComponent } from './webhook-form/create-webhook-api/create-webhook-api.component';
import { EditWebhookApiComponent } from './webhook-form/edit-webhook-api/edit-webhook-api.component';
import {LandingPageModule} from "../../../landing-page/landing-page.module";
import { ResizableDirective } from './resizable.directive';
@NgModule({
  declarations: [
    WebhookPageComponent,
    DescriptionComponent,
    DetailsComponent,
    SidebarComponent,
    SidebarSearchComponent,
    TitleToggleComponent,
    SidebarListComponent,
    WebhookFormComponent,
    WelcomeComponent,
    WelcomeWithDataComponent,
    WebhookAccessGroupComponent,
    CreateWebhookApiComponent,
    EditWebhookApiComponent,
    ResizableDirective

  ],
  imports: [
    CommonModule,
    WebhookPageRoutingModule,
    WebhookCommonModule,
    WebhookModule,
    MonacoEditorModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCollapseModule,
    LandingPageModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebhookPageModule { }
