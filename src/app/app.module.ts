import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { Webhook1Component } from './components/home/webhooks/details/webhook1/webhook1.component';
import { OrderComponent } from './components/home/webhooks/details/order/order.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbModule } from 'angular-crumbs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LogoComponent } from './components/header/logo/logo.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { SearchComponent } from './components/header/search/search.component';
import { LoginGetStartedComponent } from './components/header/login-get-started/login-get-started.component';
import { WebhooksComponent } from './components/home/webhooks/webhooks.component';
import { SubscriptionsComponent } from './components/home/subscriptions/subscriptions.component';
import { AuditLogComponent } from './components/home/audit-log/audit-log.component';
import { SidebarComponent } from './components/home/webhooks/sidebar/sidebar.component';
import { DetailsComponent } from './components/home/webhooks/details/details.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    Webhook1Component,
    OrderComponent,
    WebhooksComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    LogoComponent,
    MenuComponent,
    SearchComponent,
    LoginGetStartedComponent,
    SubscriptionsComponent,
    AuditLogComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreadcrumbModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
