import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestOrderComponent } from './test-order/test-order.component';
import { SubscribeOrderComponent } from './subscribe-order/subscribe-order.component';
import { WebhookPageComponent } from './webhook-page/webhook-page.component';
import { CongratsComponent } from './subscribe-order/congrats/congrats.component';
import { CreateWebhookComponent } from './webhook-page/create-webhook/create-webhook.component';
const routes: Routes =  [
  
          {
              path: '',
              redirectTo: "webhooks-page",
              pathMatch: "full"
          },
          {
              path: 'webhooks-page',
              component: WebhookPageComponent,
              loadChildren: () => import('./webhook-page/webhook-page.module').then(m => m.WebhookPageModule),            
          },
          {
              path: 'test-order/:webhookId',
              component: TestOrderComponent,
              data: {
                  breadcrumb: 'Test order webhook'
              },

          },
          {
              path: 'subscribe-order/:webhookId',
              component: SubscribeOrderComponent,
              data: {
                  breadcrumb: 'Subscribe to order webhook'
              },
          }, 
          {
            path: 'create-webhook',
            component: CreateWebhookComponent,
            data: {
                breadcrumb: 'Create new webhook group'
            },
        },  
          {
            path: 'congrats',
            component: CongratsComponent,               
         } 
  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebhooksRoutingModule { }
