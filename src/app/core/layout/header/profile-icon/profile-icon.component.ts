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

import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../../shared/service/auth.service";
import {ModalService} from "../../../../shared/service/modal.service";
import {ApplicationContext} from "../../../../shared/application.context";
import {Constants} from "../../../../shared/constants";
import {ProfileService} from "../../../../shared/service/profile.service";
import {AboutService} from "../../../../shared/service/about.service";

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent {
  @ViewChild("resultViewer") resultViewer!: TemplateRef<any>;
  primaryColor!: string

  constructor(
    private readonly appContext: ApplicationContext,
    private readonly modalService: ModalService,
    private readonly profileService: ProfileService,
    private readonly aboutService: AboutService,
    @Inject("Auth") readonly authService: AuthService
  ) {
    this.primaryColor = Constants.CSS_PRIMARY_COLOR;
  }

  get picture(): string {
    return this.profileService.picture
  }

  get name(): string {
    return this.profileService.name
  }

  get hasDetails(): boolean {
    return (this.name != undefined) || (this.picture != undefined)
  }

  logout() {
    this.authService.logout()
  }

  showDetails() {
    this.modalService.openJson(this.resultViewer, this.appContext.user);
  }

  about() {
    this.modalService.openJson(this.resultViewer, this.aboutService.details);
  }
}
