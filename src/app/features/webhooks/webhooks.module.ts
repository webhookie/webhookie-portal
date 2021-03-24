import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {WebhooksHomeComponent} from "./home/webhooks-home.component";
import {WebhooksRoutingModule} from "./webhooks-routing.module";


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [WebhooksHomeComponent],
  imports: [
    SharedModule, WebhooksRoutingModule
  ]
})
export class WebhooksModule { }
