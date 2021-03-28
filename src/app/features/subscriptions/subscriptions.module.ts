import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SubscriptionsRoutingModule} from "./subscriptions-routing.module";
import {SubscriptionsHomeComponent} from "./home/subscriptions-home.component";
import { ProviderSubscriptionsComponent } from './provider-subscriptions/provider-subscriptions.component';
import { ConsumerSubscriptionsComponent } from './consumer-subscriptions/consumer-subscriptions.component';


@NgModule({
  declarations: [
    SubscriptionsHomeComponent,
    ProviderSubscriptionsComponent,
    ConsumerSubscriptionsComponent
  ],
  imports: [
    SharedModule, SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
