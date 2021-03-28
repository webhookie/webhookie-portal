import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionsHomeComponent} from "./home/subscriptions-home.component";
import {ConsumerSubscriptionsComponent} from "./consumer-subscriptions/consumer-subscriptions.component";
import {ProviderSubscriptionsComponent} from "./provider-subscriptions/provider-subscriptions.component";


const routes: Routes = [
  {
    path: '',
    component: SubscriptionsHomeComponent,
    children: [
      {
        path: 'consumer',
        component: ConsumerSubscriptionsComponent
      },
      {
        path: 'provider',
        component: ProviderSubscriptionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule {}
