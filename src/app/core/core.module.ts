import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {HttpTokenInterceptor} from "./http.token.interceptor";
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {LogoComponent} from './layout/header/logo/logo.component';
import {BreadcrumbsComponent} from './layout/breadcrumbs/breadcrumbs.component';
import {MenuComponent} from './layout/header/menu/menu.component';
import {SearchComponent} from './layout/header/search/search.component';
import {LoginGetStartedComponent} from './layout/header/login-get-started/login-get-started.component';
import {BreadcrumbModule} from 'angular-crumbs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';

@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
  ],
  declarations: [MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LogoComponent,
    MenuComponent,
    SearchComponent,
    LoginGetStartedComponent,
  ],
  exports: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LogoComponent,
    MenuComponent,
    SearchComponent,
    LoginGetStartedComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserModule,
    RouterModule,
    FormsModule,
    BreadcrumbModule,
    MatToolbarModule

  ],

})
export class CoreModule {
}
