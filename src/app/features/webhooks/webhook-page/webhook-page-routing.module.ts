import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './details/order/order.component';
import { WelcomeComponent } from './details/welcome/welcome.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: "order",
        pathMatch: "full"
    },
    {
        path: 'order',
        component: OrderComponent,
        loadChildren: () => import('./details/order/order.module').then(m => m.OrderModule),
    },
    {
        path: 'welcome',
        component: WelcomeComponent,
    },
    
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebhookPageRoutingModule { }
