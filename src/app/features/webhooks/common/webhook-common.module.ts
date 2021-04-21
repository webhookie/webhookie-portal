import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TitleComponent} from './title/title.component';
import {OrderTitleComponent} from './order-title/order-title.component';
import {OrderRateSubLinksComponent} from './order-rate-sub-links/order-rate-sub-links.component';
import {RequestExampleComponent} from './request-example/request-example.component';
import {ResponseComponent} from './response/response.component';
import {RouterModule} from '@angular/router';
import { RequestHeadersComponent } from './request-example/request-headers/request-headers.component';
import { RequestBodyComponent } from './request-example/request-body/request-body.component';

@NgModule({
  declarations: [
    OrderTitleComponent,
    TitleComponent,
    OrderRateSubLinksComponent,
    RequestExampleComponent,
    ResponseComponent,
    RequestHeadersComponent,
    RequestBodyComponent,
  ],
  exports: [
    OrderTitleComponent,
    TitleComponent,
    OrderRateSubLinksComponent,
    RequestExampleComponent,
    ResponseComponent,
    RequestHeadersComponent,
    RequestBodyComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],

  providers: []
})
export class WebhookCommonModule {
}


