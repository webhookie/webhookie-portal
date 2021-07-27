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

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbModule} from 'angular-crumbs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {LandingPageModule} from './landing-page/landing-page.module';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {WebhookCommonModule} from './features/webhooks/common/webhook-common.module';
import {CommonModule} from '@angular/common';
import {SubscriptionsModule} from './features/subscriptions/subscriptions.module';
import {BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {AdministrationModule} from './features/administration/administration.module';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgHttpLoaderModule} from "ng-http-loader";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    LandingPageModule,
    AdministrationModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    MatToolbarModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    SubscriptionsModule,
    WebhookCommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CarouselModule,
    SlickCarouselModule,
    AppRoutingModule,
    NgHttpLoaderModule.forRoot(),
    SharedModule,
  ],

  providers: [BsModalRef],
  bootstrap: [AppComponent],
})
export class AppModule { }
