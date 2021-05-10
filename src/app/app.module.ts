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
