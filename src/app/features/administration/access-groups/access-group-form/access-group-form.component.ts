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
