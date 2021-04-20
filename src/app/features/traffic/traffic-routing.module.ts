import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrafficHomeComponent} from "./home/traffic-home.component";
import {SubscriptionTrafficComponent} from "./subscription-traffic/subscription-traffic.component";
import {WebhookTrafficComponent} from "./webhook-traffic/webhook-traffic.component";


const routes: Routes = [
  {
    path: '',
    component: TrafficHomeComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo:'subscription'
      },
      {
        path: 'subscription',
        component: SubscriptionTrafficComponent
      },
      {
        path: 'webhook',
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
