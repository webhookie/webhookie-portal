import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { WebhookCommonModule } from 'src/app/features/webhooks/common/webhook-common.module';
import { WhiteLabelComponent } from './white-label/white-label.component';
import { ConsumerComponent } from './consumer/consumer.component';
import {AdministrationRoutingModule } from './administration-routing.module';
import { ProviderComponent } from './provider/provider.component';
@NgModule({
  declarations: [
    AdministrationComponent,
    LeftSidebarComponent,
    WhiteLabelComponent,
    ConsumerComponent,
    ProviderComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    WebhookCommonModule
  ]
})
export class AdministrationModule { }
