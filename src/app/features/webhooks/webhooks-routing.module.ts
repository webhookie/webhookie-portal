import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscribeWebhookComponent} from './subscribe-webhook/subscribe-webhook.component';
import {WebhookPageComponent} from './webhook-page/webhook-page.component';
import {CallbackTestComponent} from "./callback-test/callback-test.component";
import { CongratsComponent } from './subscribe-webhook/congrats/congrats.component';
import { CreateWebhookComponent } from './webhook-page/create-webhook/create-webhook.component';
const routes: Routes = [
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
    path: 'callback-test',
    component: CallbackTestComponent,
    data: {
      breadcrumb: 'Test order webhook'
    },

  },
  {
    path: 'subscribe-webhook',
    component: SubscribeWebhookComponent,
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
export class WebhooksRoutingModule {
}
