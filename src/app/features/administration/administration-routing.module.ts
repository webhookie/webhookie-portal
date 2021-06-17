import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccessGroupComponent} from "./access-group/groups/access-group.component";
import {WhiteLabelComponent} from "./white-label/white-label.component";

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo:'consumer'
  },
  {
    path: 'consumer',
    component: AccessGroupComponent,
    data: {
      breadcrumb: 'Consumer',
      type: "Consumer"
    }
  },
  {
    path: 'provider',
    component: AccessGroupComponent,
    data: {
      breadcrumb: 'Provider',
      type: "Provider"
    }
  },
  {
    path: 'whitelabel',
    component: WhiteLabelComponent,
    data: {
      breadcrumb: "White Label"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
