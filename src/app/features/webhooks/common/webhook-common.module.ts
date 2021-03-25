import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { OrderTitleComponent } from './order-title/order-title.component';
import { OrderRateSubLinksComponent } from './order-rate-sub-links/order-rate-sub-links.component';
import { SubTestDotButtonsComponent } from './sub-test-dot-buttons/sub-test-dot-buttons.component';
import { RequestExampleComponent } from './request-example/request-example.component';
import { ResponseComponent } from './response/response.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrderTitleComponent,
    TitleComponent,
    OrderRateSubLinksComponent,   
    SubTestDotButtonsComponent,
    RequestExampleComponent,
    ResponseComponent,
  ],
  exports:[
    OrderTitleComponent,
    TitleComponent,
    OrderRateSubLinksComponent,   
    SubTestDotButtonsComponent,
    RequestExampleComponent,
    ResponseComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  
  providers:[]
})
export class WebhookCommonModule { }

