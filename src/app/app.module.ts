import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { Webhook1Component } from './features/webhooks/webhook-page/details/webhook1/webhook1.component';
import { OrderComponent } from './features/webhooks/webhook-page/details/order/order.component';
import { WebhooksComponent } from './features/webhooks/webhooks.component';
import { BreadcrumbsComponent } from './core/layout/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './features/webhooks/webhook-page/sidebar/sidebar.component';
import { LogoComponent } from './core/layout/header/logo/logo.component';
import { MenuComponent } from './core/layout/header/menu/menu.component';
import { SearchComponent } from './core/layout/header/search/search.component';
import { LoginGetStartedComponent } from './core/layout/header/login-get-started/login-get-started.component';
import { SubscriptionsComponent } from './features/subscriptions/subscriptions.component';
import { AuditLogComponent } from './features/audit-log/audit-log.component';
import { DetailsComponent } from './features/webhooks/webhook-page/details/details.component';
import { RequestExampleComponent } from './shared/request-example/request-example.component';
import { SubTestDotButtonsComponent } from './shared/sub-test-dot-buttons/sub-test-dot-buttons.component';
import { TitleComponent } from './shared/title/title.component';
import { OrderMenuComponent } from './features/webhooks/webhook-page/details/order/order-menu/order-menu.component';
import { OrderTitleComponent } from './shared/order-title/order-title.component';
import { WebhookDetailComponent } from './features/webhooks/webhook-page/details/order/webhook-detail/webhook-detail.component';
import { ReviewsComponent } from './features/webhooks/webhook-page/details/order/reviews/reviews.component';
import { SupportComponent } from './features/webhooks/webhook-page/details/order/support/support.component';
import { BodyComponent } from './features/webhooks/webhook-page/details/order/webhook-detail/body/body.component';
import { HeadersComponent } from './features/webhooks/webhook-page/details/order/webhook-detail/headers/headers.component';
import { SecurityOptionsComponent } from './features/webhooks/webhook-page/details/order/webhook-detail/security-options/security-options.component';
import { TitleToggleComponent } from './features/webhooks/webhook-page/sidebar/title-toggle/title-toggle.component';
import { SidebarSearchComponent } from './features/webhooks/webhook-page/sidebar/sidebar-search/sidebar-search.component';
import { SidebarListComponent } from './features/webhooks/webhook-page/sidebar/sidebar-list/sidebar-list.component';
import { OrderRateSubLinksComponent } from './shared/order-rate-sub-links/order-rate-sub-links.component';
import { DescriptionComponent } from './features/webhooks/webhook-page/description/description.component';
import { TestOrderComponent } from './features/webhooks/test-order/test-order.component';
import { WebhookPageComponent } from './features/webhooks/webhook-page/webhook-page.component';
import { CoreModule } from './core/core.module';
import { ResponseComponent } from './shared/response/response.component';
import { CallbackUrlComponent } from './features/webhooks/test-order/callback-url/callback-url.component';
import { SubscribeOrderComponent } from './features/webhooks/subscribe-order/subscribe-order.component';
import { ApplicationComponent } from './features/webhooks/subscribe-order/application/application.component';
import { CallbackComponent } from './features/webhooks/subscribe-order/callback/callback.component';
import { RequestComponent } from './features/webhooks/webhook-page/request/request.component';


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
    DescriptionComponent,
    TestOrderComponent,
    WebhookPageComponent,
    ResponseComponent,
    CallbackUrlComponent,
    SubscribeOrderComponent,
    ApplicationComponent,
    CallbackComponent,
    RequestComponent,
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
