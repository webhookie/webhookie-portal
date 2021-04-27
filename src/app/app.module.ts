import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ModalModule,BsModalRef } from 'ngx-bootstrap/modal';
import { WebhookCommonModule } from './features/webhooks/common/webhook-common.module';
import { CommonModule } from '@angular/common';
import { SubscriptionsModule } from './features/subscriptions/subscriptions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AdministrationModule } from './features/administration/administration.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';


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
  ],

  providers: [BsModalRef],
  bootstrap: [AppComponent],
})
export class AppModule { }
