import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebhookRoutingModule} from './webhook-routing.module';
import {WebhookComponent} from './webhook.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {SupportComponent} from './support/support.component';
import {WebhookMenuComponent} from './webhook-menu/webhook-menu.component';
import {WebhookDetailComponent} from './webhook-detail/webhook-detail.component';
import {HeadersComponent} from './webhook-detail/headers/headers.component';
import {BodyComponent} from './webhook-detail/body/body.component';
import {SecurityOptionsComponent} from './webhook-detail/security-options/security-options.component';
import {WebhookCommonModule} from '../../../common/webhook-common.module';
import {SharedModule} from "../../../../../shared/shared.module";

@NgModule({
  declarations: [
    WebhookComponent,
    ReviewsComponent,
    SupportComponent,
    WebhookMenuComponent,
    WebhookDetailComponent,
    HeadersComponent,
    BodyComponent,
    SecurityOptionsComponent
  ],
  exports: [
    HeadersComponent,
    BodyComponent,
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