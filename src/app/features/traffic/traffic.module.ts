import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {TrafficHomeComponent} from "./home/traffic-home.component";
import {TrafficRoutingModule} from "./traffic-routing.module";
import {SubscriptionTrafficComponent} from './subscription-traffic/subscription-traffic.component';
import {WebhookTrafficComponent} from './webhook-traffic/webhook-traffic.component';


@NgModule({
  declarations: [
    TrafficHomeComponent,
    SubscriptionTrafficComponent,
    WebhookTrafficComponent
  ],
  imports: [
    SharedModule,
    TrafficRoutingModule
  ]
})
export class TrafficModule {
}
