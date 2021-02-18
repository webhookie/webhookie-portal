import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuditHomeComponent} from "./home/audit-home.component";


const routes: Routes = [{ path: '', component: AuditHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule {}
