import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministrationComponent} from './administration.component';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import {WebhookCommonModule} from 'src/app/features/webhooks/common/webhook-common.module';
import {WhiteLabelComponent} from './white-label/white-label.component';
import {AccessGroupComponent} from './access-groups/access-group.component';
import {AdministrationRoutingModule} from './administration-routing.module';
import {ColorPickerModule} from '@iplab/ngx-color-picker';
import {SharedModule} from "../../shared/shared.module";
import { AccessGroupFormComponent } from './access-groups/access-group-form/access-group-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdministrationComponent,
    LeftSidebarComponent,
    WhiteLabelComponent,
    AccessGroupComponent,
    AccessGroupFormComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    WebhookCommonModule,
    ColorPickerModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdministrationModule { }
