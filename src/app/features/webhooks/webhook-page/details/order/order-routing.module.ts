import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebhookDetailComponent } from './webhook-detail/webhook-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SupportComponent } from './support/support.component';
const routes: Routes = [
    
            {
                path: '',
                redirectTo: "webhook-detail",
                pathMatch: "full"
            },
            {
                path: 'webhook-detail',
                component: WebhookDetailComponent,
            },
            {
                path: 'reviews',
                component: ReviewsComponent,

            },
            {
                path: 'support',
                component: SupportComponent,
            },
    
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
