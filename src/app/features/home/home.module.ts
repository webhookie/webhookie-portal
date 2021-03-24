import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { HomeMainComponent } from './main/home-main.component';
import {HomeRoutingModule} from "./home-routing.module";
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeMainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule, 
    SubscriptionsModule
  ]
})
export class HomeModule { }
