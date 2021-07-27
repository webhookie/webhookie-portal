/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
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
