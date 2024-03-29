/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {NgModule} from '@angular/core';
import {WebhooksRoutingModule} from './webhooks-routing.module';
import {WebhooksComponent} from './webhooks.component';
import {CommonModule} from '@angular/common';
import {WebhookPageModule} from './webhook-page/webhook-page.module';
import {SubscribeWebhookComponent} from './subscribe-webhook/subscribe-webhook.component';
import {CallbackComponent} from './subscribe-webhook/subscription-wizard/pages/callback/callback.component';
import {ApplicationComponent} from './subscribe-webhook/subscription-wizard/pages/application/application.component';
import {WebhookCommonModule} from './common/webhook-common.module';
import {CallbackTestComponent} from "./callback-test/callback-test.component";
import {CallbackUrlComponent} from "./callback-test/callback-url/callback-url.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {
  CreateApplicationComponent
} from './subscribe-webhook/subscription-wizard/pages/application/create-application/create-application.component';
import {
  CreateCallbackComponent
} from './subscribe-webhook/subscription-wizard/pages/callback/create-callback/create-callback.component';
import {DotMenuComponent} from 'src/app/shared/components/dot-menu/dot-menu.component';
import {SharedModule} from "../../shared/shared.module";
import {
  CongratsSvgComponent
} from './subscribe-webhook/subscription-wizard/pages/congrats/congrats-svg/congrats-svg.component';
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {SubscriptionWizardComponent} from './subscribe-webhook/subscription-wizard/subscription-wizard.component';
import {
  VerifyCallbackComponent
} from './subscribe-webhook/subscription-wizard/pages/verify-callback/verify-callback.component';
import {
  WizardCongratsComponent
} from "./subscribe-webhook/subscription-wizard/pages/congrats/wizard-congrats.component";
import {
  WizardStepBaseComponent
} from './subscribe-webhook/subscription-wizard/steps/wizard-step-base/wizard-step-base.component';
import {
  ApprovalDetailsComponent
} from './subscribe-webhook/subscription-wizard/pages/approval-details/approval-details.component';
import {
  PayloadMappingComponent
} from "./subscribe-webhook/subscription-wizard/pages/payload-mapping/payload-mapping.component";
import {MonacoEditorModule} from "@materia-ui/ngx-monaco-editor";

@NgModule({
  declarations: [
    WebhooksComponent,
    CallbackTestComponent,
    CallbackComponent,
    ApplicationComponent,
    CallbackUrlComponent,
    SubscribeWebhookComponent,
    CreateApplicationComponent,
    CreateCallbackComponent,
    DotMenuComponent,
    CongratsSvgComponent,
    SubscriptionWizardComponent,
    VerifyCallbackComponent,
    PayloadMappingComponent,
    WizardCongratsComponent,
    WizardStepBaseComponent,
    ApprovalDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WebhooksRoutingModule,
    WebhookCommonModule,
    WebhookPageModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbAlertModule,
    MonacoEditorModule,
  ],

})
export class WebhooksModule {
}
