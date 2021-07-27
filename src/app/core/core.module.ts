/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
