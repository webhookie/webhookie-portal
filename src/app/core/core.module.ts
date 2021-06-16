import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
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
import { ProfileIconComponent } from './layout/header/profile-icon/profile-icon.component';
import {SharedModule} from "../shared/shared.module";
import {AvatarModule} from "ngx-avatar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LogoComponent,
    MenuComponent,
    SearchComponent,
    LoginGetStartedComponent,
    ProfileIconComponent,
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
    ProfileIconComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserModule,
    RouterModule,
    FormsModule,
    BreadcrumbModule,
    MatToolbarModule,
    SharedModule,
    AvatarModule,
    MatButtonModule

  ],

})
export class CoreModule {
}
