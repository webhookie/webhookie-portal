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
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {WebhooksComponent} from './features/webhooks/webhooks.component';
import { AdministrationComponent } from './features/administration/administration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {AdminActivationGuard} from "./shared/guard/admin-activation-guard";
const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: LandingPageComponent,
    loadChildren: () => import('./landing-page/landing-page.module')
      .then(m => m.LandingPageModule),
    // data: {
    //   breadcrumb: 'Home',
    // },

  },
  {
    path: 'webhooks',
    component: WebhooksComponent,
    data: {
      breadcrumb: 'Webhooks',
    },
    loadChildren: () => import('./features/webhooks/webhooks.module')
      .then(m => m.WebhooksModule),
  },
  {
    path: 'subscriptions',
    data: {
      breadcrumb: 'Subscriptions'
    },
    loadChildren: () => import('./features/subscriptions/subscriptions.module')
      .then(m => m.SubscriptionsModule)
  },
  {
    path: 'traffic',
    data: {
      breadcrumb: 'Traffic'
    },
    loadChildren: () => import('./features/traffic/traffic.module')
      .then(m => m.TrafficModule)
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [AdminActivationGuard],
    data: {
      breadcrumb: 'Administration'
    },
    loadChildren: () => import('./features/administration/administration.module')
      .then(m => m.AdministrationModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled"
  //scrollPositionRestoration: "enabled"
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
