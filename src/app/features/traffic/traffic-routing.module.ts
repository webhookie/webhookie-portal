import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrafficHomeComponent} from "./home/traffic-home.component";
import {SubscriptionTrafficComponent} from "./subscription-traffic/subscription-traffic.component";
import {WebhookTrafficComponent} from "./webhook-traffic/webhook-traffic.component";
import {ConsumerActivationGuard} from "../../shared/guard/consumer-activation-guard";
import {AdminOrProviderActivationGuard} from "../../shared/guard/admin-provider-activation-guard";


const routes: Routes = [
  {
    path: '',
    component: TrafficHomeComponent,
    children: [
      {
        path: 'subscription',
        canActivate: [ConsumerActivationGuard],
        component: SubscriptionTrafficComponent
      },
      {
        path: 'webhook',
        canActivate: [AdminOrProviderActivationGuard],
        component: WebhookTrafficComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafficRoutingModule {
}
