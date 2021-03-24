import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SubscriptionsRoutingModule} from "./subscriptions-routing.module";
import {SubscriptionsHomeComponent} from "./home/subscriptions-home.component";


@NgModule({
  declarations: [SubscriptionsHomeComponent],
  imports: [
    SharedModule, SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
