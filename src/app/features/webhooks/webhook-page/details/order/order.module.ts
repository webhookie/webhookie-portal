import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SupportComponent } from './support/support.component';
import { OrderMenuComponent } from './order-menu/order-menu.component';
import { WebhookDetailComponent } from './webhook-detail/webhook-detail.component';
import { HeadersComponent } from './webhook-detail/headers/headers.component';
import { BodyComponent } from './webhook-detail/body/body.component';
import { SecurityOptionsComponent } from './webhook-detail/security-options/security-options.component';
import { WebhookCommonModule } from '../../../common/webhook-common.module';

@NgModule({ 
  declarations: [
    OrderComponent,
    ReviewsComponent,
    SupportComponent,
    OrderMenuComponent,
    WebhookDetailComponent,
    HeadersComponent,
    BodyComponent,
    SecurityOptionsComponent
  ],
  exports:[
    HeadersComponent,
    BodyComponent,
    SecurityOptionsComponent
  ],
  imports: [  
    CommonModule,  
    OrderRoutingModule,
    WebhookCommonModule
  ],
})
export class OrderModule { }
