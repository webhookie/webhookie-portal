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
