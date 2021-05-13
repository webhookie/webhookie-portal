import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscribeWebhookComponent} from './subscribe-webhook/subscribe-webhook.component';
import {WebhookPageComponent} from './webhook-page/webhook-page.component';
import {CallbackTestComponent} from "./callback-test/callback-test.component";
import { CongratsComponent } from './subscribe-webhook/congrats/congrats.component';
import { WebhookFormComponent } from './webhook-page/webhook-form/webhook-form.component';
import {CanActivateSubscribe} from "./service/can-activate-subscribe";
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
    component: WebhookFormComponent,
    data: {
        breadcrumb: 'Create new webhook group',
      editMode: false
    },
  },
  {
    path: 'edit-webhook-group',
    component: WebhookFormComponent,
    data: {
      breadcrumb: 'Update webhook group',
      editMode: true
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
