import { NgModule } from '@angular/core';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';
import { CommonModule } from '@angular/common';
import { WebhookPageModule } from './webhook-page/webhook-page.module';
import { TestOrderComponent } from './test-order/test-order.component';
import { SubscribeOrderComponent } from './subscribe-order/subscribe-order.component';
import { CongratsComponent } from './subscribe-order/congrats/congrats.component';
import { CallbackComponent } from './subscribe-order/callback/callback.component';
import { ApplicationComponent } from './subscribe-order/application/application.component';
import { CallbackUrlComponent } from './test-order/callback-url/callback-url.component';
import { WebhookCommonModule } from './common/webhook-common.module';
import { RouterModule } from '@angular/router';
@NgModule({ 
  declarations: [
    WebhooksComponent,
    TestOrderComponent,
    CallbackComponent,
    ApplicationComponent,
    CallbackUrlComponent,
    SubscribeOrderComponent,
    CongratsComponent
  ],
  imports: [   
    CommonModule,
    RouterModule,
    WebhooksRoutingModule,
    WebhookCommonModule,
    WebhookPageModule,
  ],
  
})
export class WebhooksModule { }
