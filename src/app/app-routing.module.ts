import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { WebhooksComponent } from './features/webhooks/webhooks.component';
import { OrderComponent } from './features/webhooks/details/order/order.component';
import { WebhookDetailComponent } from './features/webhooks/details/order/webhook-detail/webhook-detail.component';
import { ReviewsComponent } from './features/webhooks/details/order/reviews/reviews.component';
import { SupportComponent } from './features/webhooks/details/order/support/support.component';
import { Webhook1Component } from './features/webhooks/details/webhook1/webhook1.component';
import { SubscriptionsComponent } from './features/subscriptions/subscriptions.component';
import { AuditLogComponent } from './features/audit-log/audit-log.component';

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
            
        }   
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
