import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module')
        .then(m => {
          console.warn("home")
          return m.HomeModule
        })
  },
  {
    path: 'webhooks',
    loadChildren: () =>
      import('./features/webhooks/webhooks.module').then(m => {
        console.warn("webhooks")
        return m.WebhooksModule
      })
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./features/subscriptions/subscriptions.module').then(m => {
        console.warn("subscriptions")
        return m.SubscriptionsModule
      })
  },
  {
    path: 'audit',
    loadChildren: () =>
      import('./features/audit/audit.module').then(m => {
        console.warn("audit")
        return m.AuditModule
      })
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
export class AppRoutingModule {}
