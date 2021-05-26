import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscriptionsHomeComponent} from "./home/subscriptions-home.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {Constants} from "../../shared/constants";
import {ConsumerActivationGuard} from "../../shared/guard/consumer-activation-guard";
import {AdminOrProviderActivationGuard} from "../../shared/guard/admin-provider-activation-guard";


const routes: Routes = [
  {
    path: '',
    component: SubscriptionsHomeComponent,
    children: [
      {
        path: 'consumer',
        component: SubscriptionsComponent,
        canActivate: [ConsumerActivationGuard],
        data: {
          role: Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER
        }
      },
      {
        path: 'provider',
        component: SubscriptionsComponent,
        canActivate: [AdminOrProviderActivationGuard],
        data: {
          role: Constants.SUBSCRIPTIONS_VIEW_ROLE_PROVIDER
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule {}
