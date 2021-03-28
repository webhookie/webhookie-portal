import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SubscriptionsRoutingModule} from "./subscriptions-routing.module";
import {SubscriptionsHomeComponent} from "./home/subscriptions-home.component";
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';


@NgModule({
  declarations: [
    SubscriptionsHomeComponent,
    SubscriptionsComponent
  ],
  imports: [
    SharedModule, SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
