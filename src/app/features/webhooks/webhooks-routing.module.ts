import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebhooksHomeComponent} from "./home/webhooks-home.component";
import '@asyncapi/web-component/lib/asyncapi-web-component';


const routes: Routes = [{ path: '', component: WebhooksHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebhooksRoutingModule {}
