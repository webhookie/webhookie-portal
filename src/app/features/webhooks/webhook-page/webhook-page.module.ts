import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { DetailsComponent } from './details/details.component';
import { RequestComponent } from './request/request.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarSearchComponent } from './sidebar/sidebar-search/sidebar-search.component';
import { TitleToggleComponent } from './sidebar/title-toggle/title-toggle.component';
import { SidebarListComponent } from './sidebar/sidebar-list/sidebar-list.component';
import { WebhookPageComponent } from './webhook-page.component';
import { WebhookPageRoutingModule } from './webhook-page-routing.module';
import { OrderModule } from './details/order/order.module'
import { WebhookCommonModule } from '../common/webhook-common.module';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { WelcomeComponent } from './details/welcome/welcome.component';
import { WelcomeWithDataComponent } from './details/welcome/welcome-with-data/welcome-with-data.component';
import { WelcomeWithoutDataComponent } from './details/welcome/welcome-without-data/welcome-without-data.component';
import {MonacoEditorModule} from "@materia-ui/ngx-monaco-editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import { WebhookAccessGroupComponent } from './create-webhook/webhook-access-group/webhook-access-group.component';
import {NgbAlertModule, NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [
    WebhookPageComponent,
    DescriptionComponent,
    DetailsComponent,
    RequestComponent,
    SidebarComponent,
    SidebarSearchComponent,
    TitleToggleComponent,
    SidebarListComponent,
    CreateWebhookComponent,
    WelcomeComponent,
    WelcomeWithDataComponent,
    WelcomeWithoutDataComponent,
    WebhookAccessGroupComponent,


  ],
  imports: [
    CommonModule,
    WebhookPageRoutingModule,
    WebhookCommonModule,
    OrderModule,
    MonacoEditorModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCollapseModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebhookPageModule { }
