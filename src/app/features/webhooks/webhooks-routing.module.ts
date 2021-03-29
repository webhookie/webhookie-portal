import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscribeOrderComponent} from './subscribe-order/subscribe-order.component';
import {WebhookPageComponent} from './webhook-page/webhook-page.component';
import {CallbackTestComponent} from "./callback-test/callback-test.component";

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
    path: 'subscribe-order',
    component: SubscribeOrderComponent,
    data: {
      breadcrumb: 'Subscribe to order webhook'
    },

  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebhooksRoutingModule {
}
