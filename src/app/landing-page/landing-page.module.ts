import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { BannerComponent } from './banner/banner.component';
import { WebhookSliderComponent } from './webhook-slider/webhook-slider.component';
import { WebhookEmptyComponent } from './webhook-empty/webhook-empty.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { WhyWebhookComponent } from './why-webhook/why-webhook.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {LandingPageRoutingModule} from "./landingpage-routing.module";
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [
    LandingPageComponent,
    WebhookSliderComponent,
    WebhookEmptyComponent,
    BannerComponent,
    HowItWorksComponent,
    WhyWebhookComponent,

  ],
  exports: [
    WebhookEmptyComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SlickCarouselModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
