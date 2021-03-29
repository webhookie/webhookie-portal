import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebhooksComponent} from './features/webhooks/webhooks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'webhooks',
    pathMatch: 'full'

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
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
