/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
import { WhyWebhooksEventDrivenSvgComponent } from './why-webhook/svg/why-webhooks-event-driven-svg/why-webhooks-event-driven-svg.component';
import { WhyWebhooksDiscoverableSvgComponent } from './why-webhook/svg/why-webhooks-discoverable-svg/why-webhooks-discoverable-svg.component';
import { WhyWebhooksIntegrationSvgComponent } from './why-webhook/svg/why-webhooks-integration-svg/why-webhooks-integration-svg.component';
import { WhyWebhooksSelfManagedSvgComponent } from './why-webhook/svg/why-webhooks-self-managed-svg/why-webhooks-self-managed-svg.component';
import { WhyWebhooksFutureSvgComponent } from './why-webhook/svg/why-webhooks-future-svg/why-webhooks-future-svg.component';
import { WhyWebhooksDeliverySvgComponent } from './why-webhook/svg/why-webhooks-delivery-svg/why-webhooks-delivery-svg.component';
import { LandingWebhookEmptySvgComponent } from './webhook-empty/landing-webhook-empty-svg/landing-webhook-empty-svg.component';
import { LandingBannerSvgComponent } from './banner/landing-banner-svg/landing-banner-svg.component';
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
    WhyWebhooksEventDrivenSvgComponent,
    WhyWebhooksDiscoverableSvgComponent,
    WhyWebhooksIntegrationSvgComponent,
    WhyWebhooksSelfManagedSvgComponent,
    WhyWebhooksFutureSvgComponent,
    WhyWebhooksDeliverySvgComponent,
    LandingWebhookEmptySvgComponent,
    LandingBannerSvgComponent,

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
