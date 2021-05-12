import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebhookComponent } from './details/webhook/webhook.component';
import { WelcomeComponent } from './details/welcome/welcome.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: "welcome",
        pathMatch: "full"
    },
    {
        path: 'webhook',
        component: WebhookComponent,
        loadChildren: () => import('./details/webhook/webhook.module').then(m => m.WebhookModule),
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
