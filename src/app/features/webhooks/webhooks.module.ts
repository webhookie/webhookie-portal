import { NgModule } from '@angular/core';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';
import { CommonModule } from '@angular/common';
import { WebhookPageModule } from './webhook-page/webhook-page.module';
import { SubscribeOrderComponent } from './subscribe-order/subscribe-order.component';
import { CallbackComponent } from './subscribe-order/callback/callback.component';
import { ApplicationComponent } from './subscribe-order/application/application.component';
import { WebhookCommonModule } from './common/webhook-common.module';
import {CallbackTestComponent} from "./callback-test/callback-test.component";
import {CallbackUrlComponent} from "./callback-test/callback-url/callback-url.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    WebhooksComponent,
    CallbackTestComponent,
    CallbackComponent,
    ApplicationComponent,
    CallbackUrlComponent,
    SubscribeOrderComponent,

  ],
  imports: [
    CommonModule,
    WebhooksRoutingModule,
    WebhookCommonModule,
    WebhookPageModule,
    FormsModule,
    ReactiveFormsModule,
  ],

})
export class WebhooksModule { }
