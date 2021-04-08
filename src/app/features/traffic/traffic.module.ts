import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";
import {TrafficHomeComponent} from "./home/traffic-home.component";
import {TrafficRoutingModule} from "./traffic-routing.module";
import {SubscriptionTrafficComponent} from './subscription-traffic/subscription-traffic.component';
import {WebhookTrafficComponent} from './webhook-traffic/webhook-traffic.component';
import { TrafficTableComponent } from './common/traffic-table/traffic-table.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
@NgModule({
  declarations: [
    TrafficHomeComponent,
    SubscriptionTrafficComponent,
    WebhookTrafficComponent,
    TrafficTableComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    TrafficRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot()
  ]
})
export class TrafficModule {
}
