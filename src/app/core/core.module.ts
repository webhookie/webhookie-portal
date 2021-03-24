import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {HttpTokenInterceptor} from "./http.token.interceptor";


@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  declarations: [MainLayoutComponent],
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserModule,
    RouterModule,
    CommonModule
  ],
  exports: [MainLayoutComponent]
})
export class CoreModule { }
