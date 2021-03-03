import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WebhooksComponent } from './components/webhooks/webhooks.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { LoginComponent } from './components/login/login.component';
import { AuditLogComponent } from './components/audit-log/audit-log.component';
import { Webhook1Component } from './components/webhook1/webhook1.component';
import { OrderComponent } from './components/order/order.component';
const routes: Routes = [
    {
        path: '',
        redirectTo:"home",
        pathMatch:"full"
    },
  {
    path: 'home',
    component: HomeComponent,
    data: {
        breadcrumb: 'Home',
    },
    
    children: [
        {
            path: '',
            redirectTo:"webhooks",
            pathMatch:"full"
        },
        {
            path: 'webhooks',
            component: WebhooksComponent,
            data: {
                breadcrumb: 'Webhooks'
            },
            children: [
                {
                    path: '',
                    redirectTo:"order",
                    pathMatch:"full"
                },
                {
                    path: 'order',
                    component: OrderComponent,
                    data: {
                        breadcrumb: 'Order'
                    }
                    
                },
                {
                    path: 'webhook1',
                    component: Webhook1Component,
                    data: {
                        breadcrumb: 'Webhook1'
                    },
                    
                },
            ]
        },
        {
            path: 'subscriptions',
            component: SubscriptionsComponent,
            data: {
                breadcrumb: 'Subscriptions'
            },
        } ,   
        {
            path: 'auditlog',
            component: AuditLogComponent,
            data: {
                breadcrumb: 'AuditLog'
            }, 
            
        } ,
        {
            path: 'login',
            component: LoginComponent,
            data: {
                breadcrumb: 'login'
            },
        }   
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
