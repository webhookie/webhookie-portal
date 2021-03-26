import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './details/order/order.component';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
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
        path: 'create-webhook',
        component: CreateWebhookComponent,
        data: {
            breadcrumb: 'Create new webhook group'
        },
    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebhookPageRoutingModule { }
