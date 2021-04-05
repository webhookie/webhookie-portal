import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DescriptionComponent} from './description/description.component';
import {DetailsComponent} from './details/details.component';
import {RequestComponent} from './request/request.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarSearchComponent} from './sidebar/sidebar-search/sidebar-search.component';
import {TitleToggleComponent} from './sidebar/title-toggle/title-toggle.component';
import {SidebarListComponent} from './sidebar/sidebar-list/sidebar-list.component';
import {WebhookPageComponent} from './webhook-page.component';
import {WebhookPageRoutingModule} from './webhook-page-routing.module';
import {OrderModule} from './details/order/order.module'
import {WebhookCommonModule} from '../common/webhook-common.module';
import {CreateWebhookComponent} from './create-webhook/create-webhook.component';

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


  ],
  imports: [
    CommonModule,
    WebhookPageRoutingModule,
    WebhookCommonModule,
    OrderModule,
  ],


})
export class WebhookPageModule {
}
