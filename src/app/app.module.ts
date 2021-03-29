import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { ModalModule,BsModalRef } from 'ngx-bootstrap/modal';
import { WebhookCommonModule } from './features/webhooks/common/webhook-common.module';
import { CommonModule } from '@angular/common';
import { SubscriptionsModule } from './features/subscriptions/subscriptions.module';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    BreadcrumbModule,
    MatToolbarModule,
    ModalModule.forRoot(),
    SubscriptionsModule,
    WebhookCommonModule
  ],

  providers: [BsModalRef],
  bootstrap: [AppComponent],
})
export class AppModule { }
