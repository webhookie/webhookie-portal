import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { WebhooksComponent } from './components/home/webhooks/webhooks.component';
import { SubscriptionsComponent } from './components/home/subscriptions/subscriptions.component';
import { AuditLogComponent } from './components/home/audit-log/audit-log.component';
import { OrderComponent } from './components/home/webhooks/details/order/order.component';
import { Webhook1Component } from './components/home/webhooks/details/webhook1/webhook1.component';
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
