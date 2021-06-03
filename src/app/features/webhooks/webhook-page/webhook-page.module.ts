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
import { CreateWebhookGroupComponent } from './webhook-form/create-webhook-group/create-webhook-group.component';
import { EditWebhookGroupComponent } from './webhook-form/edit-webhook-group/edit-webhook-group.component';
import {LandingPageModule} from "../../../landing-page/landing-page.module";
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
    WebhookFormComponent,
    WelcomeComponent,
    WelcomeWithDataComponent,
    WebhookAccessGroupComponent,
    CreateWebhookGroupComponent,
    EditWebhookGroupComponent,


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
