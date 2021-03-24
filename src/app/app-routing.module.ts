import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuditLogComponent } from './features/audit-log/audit-log.component';
import { WebhooksComponent } from './features/webhooks/webhooks.component';

const routes: Routes = [
    {
        path: '',
        redirectTo:'home',
        pathMatch:'full'
        
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            breadcrumb: 'Home',
        },
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),       
    },
    {
        path: 'webhooks',
        component: WebhooksComponent,
        data: {
            breadcrumb: 'Webhooks',
        },
        loadChildren: () => import('./features/webhooks/webhooks.module').then(m => m.WebhooksModule),
        
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
      component: AuditLogComponent,
      data: {
          breadcrumb: 'Traffic'
      },
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
export class AppRoutingModule { }
