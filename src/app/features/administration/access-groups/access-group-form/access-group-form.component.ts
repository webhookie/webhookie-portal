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

import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccessGroup} from "../../../../shared/model/access-group";
import {AdminService} from "../../admin.service";
import {WebhookieError} from "../../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../../shared/error/duplicate-entity-error";
import {BadRequestError} from "../../../../shared/error/bad-request-error";
import {ToastService} from "../../../../shared/service/toast.service";
import {environment} from "../../../../../environments/environment";
import {AccessGroupComponent} from "../access-group.component";

@Component({
  selector: 'app-access-group-form',
  templateUrl: './access-group-form.component.html',
  styleUrls: ['./access-group-form.component.css']
})
export class AccessGroupFormComponent implements OnInit {
  accessGroupForm!: FormGroup
  @Input("group") group?: AccessGroup
  @Input("groupType") groupType!: string
  @Input("formType") formType: AccessGroupFormType = AccessGroupFormType.CREATE
  @Input("parent") parentComponent!: AccessGroupComponent
  @Input("title") title!: string
  @Input("buttonTitle") buttonTitle!: string

  debug = environment.debug

  constructor(
    public modalService: ModalService,
    private readonly toastService: ToastService,
    private readonly adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.accessGroupForm = new FormGroup({
      name: new FormControl(this.group?.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl(this.group?.description, Validators.required),
      iamGroupName: new FormControl(this.group?.iamGroupName, Validators.required)
    });
  }

  get name() { return this.accessGroupForm.get('name'); }

  get description() { return this.accessGroupForm.get('description'); }

  get iamGroupName() { return this.accessGroupForm.get('iamGroupName'); }

  formIsValid() {
    return this.accessGroupForm.dirty && this.accessGroupForm.valid
  }

  create() {
    let request = this.accessGroupForm.value

    let successHandler = () => {
      this.parentComponent.reload();
      this.modalService.hide();
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        message = "Duplicate IAM Group Name! please choose another name"
      } else if(error.name == BadRequestError.name) {
        message = `Request is invalid!. ${error.message}`
      }
      this.toastService.error(message, "Server Error")
    };

    if(this.formType == AccessGroupFormType.CREATE) {
      this.adminService.createAccessGroup(this.groupType, request)
        .subscribe(successHandler, errorHandler)
    } else if(this.formType == AccessGroupFormType.EDIT) {
      this.adminService.updateAccessGroup(this.groupType, request, this.group!.id)
        .subscribe(successHandler, errorHandler)
    }
  }
}

export enum AccessGroupFormType {
  CREATE = "CREATE",
  EDIT = "EDIT"
}
