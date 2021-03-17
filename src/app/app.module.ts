import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './features/home/home.component';
import { OrderComponent } from './features/webhooks/details/order/order.component';
import { Webhook1Component } from './features/webhooks/details/webhook1/webhook1.component';
import { WebhooksComponent } from './features/webhooks/webhooks.component';
import { SidebarComponent } from './features/webhooks/sidebar/sidebar.component';
import { SubscriptionsComponent } from './features/subscriptions/subscriptions.component';
import { AuditLogComponent } from './features/audit-log/audit-log.component';
import { DetailsComponent } from './features/webhooks/details/details.component';
import { RequestExampleComponent } from './features/webhooks/request-example/request-example.component';
import { TitleComponent } from './features/webhooks/title/title.component';
import { SubTestDotButtonsComponent } from './features/webhooks/details/order/sub-test-dot-buttons/sub-test-dot-buttons.component';
import { OrderMenuComponent } from './features/webhooks/details/order/order-menu/order-menu.component';
import { OrderTitleComponent } from './features/webhooks/details/order/order-title/order-title.component';
import { WebhookDetailComponent } from './features/webhooks/details/order/webhook-detail/webhook-detail.component';
import { ReviewsComponent } from './features/webhooks/details/order/reviews/reviews.component';
import { SupportComponent } from './features/webhooks/details/order/support/support.component';
import { HeadersComponent } from './features/webhooks/details/order/webhook-detail/headers/headers.component';
import { BodyComponent } from './features/webhooks/details/order/webhook-detail/body/body.component';
import { SecurityOptionsComponent } from './features/webhooks/details/order/webhook-detail/security-options/security-options.component';
import { TitleToggleComponent } from './features/webhooks/sidebar/title-toggle/title-toggle.component';
import { SidebarSearchComponent } from './features/webhooks/sidebar/sidebar-search/sidebar-search.component';
import { SidebarListComponent } from './features/webhooks/sidebar/sidebar-list/sidebar-list.component';
import { OrderRateSubLinksComponent } from './features/webhooks/details/order/order-rate-sub-links/order-rate-sub-links.component';
import { CoreModule } from './core/core.module';
import { BreadcrumbsComponent } from './core/layout/breadcrumbs/breadcrumbs.component';
import { LogoComponent } from './core/layout/header/logo/logo.component';
import { MenuComponent } from './core/layout/header/menu/menu.component';
import { SearchComponent } from './core/layout/header/search/search.component';
import { LoginGetStartedComponent } from './core/layout/header/login-get-started/login-get-started.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';

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
    DetailsComponent,
    RequestExampleComponent,
    TitleComponent,
    SubTestDotButtonsComponent,
    OrderMenuComponent,
    OrderTitleComponent,
    WebhookDetailComponent,
    ReviewsComponent,
    SupportComponent,
    HeadersComponent,
    BodyComponent,
    SecurityOptionsComponent,
    TitleToggleComponent,
    SidebarSearchComponent,
    SidebarListComponent,
    OrderRateSubLinksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    BreadcrumbModule,
    MatToolbarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
