import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {AuditHomeComponent} from "./home/audit-home.component";
import {AuditRoutingModule} from "./audit-routing.module";


@NgModule({
  declarations: [AuditHomeComponent],
  imports: [
    SharedModule, AuditRoutingModule
  ]
})
export class AuditModule { }
