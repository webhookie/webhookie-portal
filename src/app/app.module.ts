import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbModule} from 'angular-crumbs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {WebhookCommonModule} from './features/webhooks/common/webhook-common.module';
import {CommonModule} from '@angular/common';
import {SubscriptionsModule} from './features/subscriptions/subscriptions.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    BreadcrumbModule,
    MatToolbarModule,
    ModalModule.forRoot(),
    SubscriptionsModule,
    WebhookCommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot()
    // ToastrModule.forRoot(),
    // BrowserAnimationsModule,
  ],

  providers: [BsModalRef,BsDatepickerConfig],
  bootstrap: [AppComponent],
})
export class AppModule { }
