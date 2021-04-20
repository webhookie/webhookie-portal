import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscriptionsHomeComponent} from "./home/subscriptions-home.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";


const routes: Routes = [
  {
    path: '',
    component: SubscriptionsHomeComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo:'consumer'
      },
      {
        path: 'consumer',
        component: SubscriptionsComponent,
        data: {
          role: "CONSUMER"
        }
      },
      {
        path: 'provider',
        component: SubscriptionsComponent,
        data: {
          role: "PROVIDER"
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
