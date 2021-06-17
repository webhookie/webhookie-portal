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
  selector: 'app-create-access-group',
  templateUrl: './create-access-group.component.html',
  styleUrls: ['./create-access-group.component.css']
})
export class CreateAccessGroupComponent implements OnInit {
  accessGroupForm!: FormGroup
  group?: AccessGroup
  @Input("type") type!: string
  @Input("parent") parentComponent!: AccessGroupComponent

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

    let successHandler = (group: AccessGroup) => {
      this.parentComponent.groupCreated(group)
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

    this.adminService.createAccessGroup(this.type, request)
      .subscribe(successHandler, errorHandler)
  }
}
