import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { HomeMainComponent } from './main/home-main.component';
import {HomeRoutingModule} from "./home-routing.module";


@NgModule({
  declarations: [HomeMainComponent],
  imports: [
    SharedModule, HomeRoutingModule
  ]
})
export class HomeModule { }
