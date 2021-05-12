import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TitleComponent} from './title/title.component';
import {WebhookTitleComponent} from './webhook-title/webhook-title.component';
import {WebhookRateSubLinksComponent} from './webhook-rate-sub-links/webhook-rate-sub-links.component';
import {RequestExampleComponent} from './request-example/request-example.component';
import {ResponseComponent} from './response/response.component';
import {RouterModule} from '@angular/router';
import { RequestHeadersComponent } from './request-example/request-headers/request-headers.component';
import { RequestBodyComponent } from './request-example/request-body/request-body.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    WebhookTitleComponent,
    TitleComponent,
    WebhookRateSubLinksComponent,
    RequestExampleComponent,
    ResponseComponent,
    RequestHeadersComponent,
    RequestBodyComponent,
  ],
  exports: [
    WebhookTitleComponent,
    TitleComponent,
    WebhookRateSubLinksComponent,
    RequestExampleComponent,
    ResponseComponent,
    RequestHeadersComponent,
    RequestBodyComponent
  ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
    ],

  providers: []
})
export class WebhookCommonModule {
}


