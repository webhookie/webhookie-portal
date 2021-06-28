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
import { LandingLoginSvgComponent } from './how-it-works/svg/landing-login-svg/landing-login-svg.component';
import { LandingDiscoverSvgComponent } from './how-it-works/svg/landing-discover-svg/landing-discover-svg.component';
import { LandingTestSvgComponent } from './how-it-works/svg/landing-test-svg/landing-test-svg.component';
import { LandingSubscribeSvgComponent } from './how-it-works/svg/landing-subscribe-svg/landing-subscribe-svg.component';
@NgModule({
  declarations: [
    LandingPageComponent,
    WebhookSliderComponent,
    WebhookEmptyComponent,
    BannerComponent,
    HowItWorksComponent,
    WhyWebhookComponent,
    LandingLoginSvgComponent,
    LandingDiscoverSvgComponent,
    LandingTestSvgComponent,
    LandingSubscribeSvgComponent,

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
