import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscribeWebhookComponent} from './subscribe-webhook/subscribe-webhook.component';
import {WebhookPageComponent} from './webhook-page/webhook-page.component';
import {CallbackTestComponent} from "./callback-test/callback-test.component";
import {CongratsComponent} from './subscribe-webhook/congrats/congrats.component';
import {CanActivateSubscribe} from "./service/can-activate-subscribe";
import {EditWebhookApiComponent} from "./webhook-page/webhook-form/edit-webhook-api/edit-webhook-api.component";
import {CreateWebhookApiComponent} from "./webhook-page/webhook-form/create-webhook-api/create-webhook-api.component";

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
      breadcrumb: 'Test webhook'
    },
    canActivate: [CanActivateSubscribe]
  },
  {
    path: 'subscribe-webhook',
    component: SubscribeWebhookComponent,
    data: {
      breadcrumb: 'Subscribe to webhook'
    },
    canActivate: [CanActivateSubscribe]
  },
  {
    path: 'create-webhook',
    component: CreateWebhookApiComponent,
    data: {
        breadcrumb: 'Create new webhook API',
    },
  },
  {
    path: 'edit-webhook-api',
    component: EditWebhookApiComponent,
    data: {
      breadcrumb: 'Update webhook API',
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
