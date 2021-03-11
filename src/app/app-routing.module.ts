import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { WebhooksComponent } from './components/home/webhooks/webhooks.component';
import { SubscriptionsComponent } from './components/home/subscriptions/subscriptions.component';
import { AuditLogComponent } from './components/home/audit-log/audit-log.component';
import { OrderComponent } from './components/home/webhooks/details/order/order.component';
import { Webhook1Component } from './components/home/webhooks/details/webhook1/webhook1.component';
import { WebhookDetailComponent } from './components/home/webhooks/details/order/webhook-detail/webhook-detail.component';
import { ReviewsComponent } from './components/home/webhooks/details/order/reviews/reviews.component';
import { SupportComponent } from './components/home/webhooks/details/order/support/support.component';
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
                    // data: {
                    //     breadcrumb: 'Order'
                    // },
                    children: [
                        {
                            path: '',
                            redirectTo:"webhook-detail",
                            pathMatch:"full"
                        },
                        {
                            path: 'webhook-detail',
                            component: WebhookDetailComponent,
                            // data: {
                            //     breadcrumb: 'Webhook-detail'
                            // }
                            
                        },
                        {
                            path: 'reviews',
                            component: ReviewsComponent,
                            data: {
                                breadcrumb: 'Review'
                            },
                            
                        },
                        {
                            path: 'support',
                            component: SupportComponent,
                            data: {
                                breadcrumb: 'Support'
                            },
                            
                        },
                    ]
                    
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
            path: 'traffic',
            component: AuditLogComponent,
            data: {
                breadcrumb: 'Traffic'
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
