import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsumerComponent} from "./consumer/consumer.component";
import {WhiteLabelComponent} from "./white-label/white-label.component";
import {ProviderComponent} from "./provider/provider.component";
const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo:'consumer'
  },
  {
    path: 'consumer',
    component: ConsumerComponent,
    data: {
      breadcrumb: 'Consumer'
    }
  },
  {
    path: 'provider',
    component: ProviderComponent,
    data: {
      breadcrumb: 'Provider'
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
