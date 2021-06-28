import {NgModule} from '@angular/core';
import {WebhooksRoutingModule} from './webhooks-routing.module';
import {WebhooksComponent} from './webhooks.component';
import {CommonModule} from '@angular/common';
import {WebhookPageModule} from './webhook-page/webhook-page.module';
import {SubscribeWebhookComponent} from './subscribe-webhook/subscribe-webhook.component';
import {CongratsComponent} from './subscribe-webhook/congrats/congrats.component';
import {CallbackComponent} from './subscribe-webhook/callback/callback.component';
import {ApplicationComponent} from './subscribe-webhook/application/application.component';
import {WebhookCommonModule} from './common/webhook-common.module';
import {CallbackTestComponent} from "./callback-test/callback-test.component";
import {CallbackUrlComponent} from "./callback-test/callback-url/callback-url.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {CreateApplicationComponent} from './subscribe-webhook/application/create-application/create-application.component';
import {CreateCallbackComponent} from './subscribe-webhook/callback/create-callback/create-callback.component';
import {DotMenuComponent} from 'src/app/shared/components/dot-menu/dot-menu.component';
import {SharedModule} from "../../shared/shared.module";
import { CongratsSvgComponent } from './subscribe-webhook/congrats/congrats-svg/congrats-svg.component';

@NgModule({
  declarations: [
    WebhooksComponent,
    CallbackTestComponent,
    CallbackComponent,
    ApplicationComponent,
    CallbackUrlComponent,
    SubscribeWebhookComponent,
    CongratsComponent,
    CreateApplicationComponent,
    CreateCallbackComponent,
    DotMenuComponent,
    CongratsSvgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WebhooksRoutingModule,
    WebhookCommonModule,
    WebhookPageModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],

})
export class WebhooksModule {
}
