import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeMainComponent} from "./main/home-main.component";


const routes: Routes = [{ path: '', component: HomeMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
