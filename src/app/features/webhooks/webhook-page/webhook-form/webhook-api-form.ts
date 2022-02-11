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

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {Observable, Observer} from "rxjs";
import {ConsumerAccess, ProviderAccess} from "../../../../shared/model/access-group";
import {WebhookieError} from "../../../../shared/error/webhookie-error";
import {WebhookApi, WebhookApiApprovalDetails} from "../../model/webhook-api";
import {WebhookAPITemplate} from "./create-webhook-api/WebhookAPITemplate";
import {ProfileService} from "../../../../shared/service/profile.service";

export class WebhookApiForm {
  value(): Observable<any> {
    let consumerGroups: AccessGroupSelection = this.consumerGroups.value
      ? this.consumerGroups.value as AccessGroupSelection
      : AccessGroupSelection.initPublic();
    let providerGroups = this.providerGroups.value
      ? this.providerGroups.value as AccessGroupSelection
      : AccessGroupSelection.initPublic();

    return new Observable((observer: Observer<any>) => {
      let errors: Array<string> = [];
      if (consumerGroups.hasError()) {
        errors.push("Select 'Public' or at least one Consumer Group");
      }
      if (providerGroups.hasError()) {
        errors.push("Select 'All' or at least one Provider Group");
      }
      if(this.email.invalid) {
        errors.push("Invalid Notification Email Address");
      }
      if (errors.length > 0) {
        let msg = errors.reduce((value, current) => `${value} <br/> ${current}`)
        observer.error(new WebhookieError({
          message: msg,
          name: "Webhook API Creation Error"
        }));
      } else {
        let email = (this.requiresApproval.value) ? this.email.value : null
        let approvalDetails: WebhookApiApprovalDetails = {
          required: this.requiresApproval.value,
          email: email
        }

        observer.next(
          {
            consumerGroups: consumerGroups.items.map(it => it.key),
            providerGroups: providerGroups.items.map(it => it.key),
            consumerAccess: (consumerGroups.access == WebhookApiAccess.PUBLIC) ? ConsumerAccess.PUBLIC : ConsumerAccess.RESTRICTED,
            providerAccess: (providerGroups.access == WebhookApiAccess.PUBLIC) ? ProviderAccess.ALL : ProviderAccess.RESTRICTED,
            asyncApiSpec: this.spec.value,
            approvalDetails: approvalDetails
          }
        )
      }

      observer.complete();
    })
  }

  errors(): WebhookieError | null {
    let result = null;
    let errs = Array.of(this.consumerGroups.errors, this.providerGroups.errors)
      .filter(it => it != null)
    if (errs.length > 0) {
      result = errs
        .filter(it => it != null)
        .map((it: ValidationErrors | null) => it?.error?.message as string)
        .filter(it => it != null)
        .reduce((value: string, current: string) => {
          return `${value} <br/> ${current}`
        });
    }

    if (result) {
      return new WebhookieError({
        message: result,
        name: "Form Validation Error"
      })
    }

    return null;
  }

  id: string = "";

  get editMode(): boolean {
    return this.id != ""
  }

  constructor(
    private readonly profileService: ProfileService,
    private readonly formBuilder: FormBuilder,
    webhookApi: WebhookApi | undefined = undefined
  ) {
    let providerGroupSelection = AccessGroupSelection.initPublic();
    let consumerGroupSelection = AccessGroupSelection.initPublic();
    let spec = WebhookAPITemplate.WEBHOOK_API_TEMPLATE;
    let approvalDetails: WebhookApiApprovalDetails = {
      required: false,
      email: ""
    }

    if (webhookApi) {
      this.id = webhookApi.id;
      if (webhookApi.providerAccess == ProviderAccess.RESTRICTED) {
        let groups = webhookApi.providerGroups.map(it => new DropdownEntry(it, it))
        providerGroupSelection = AccessGroupSelection.restricted(groups);
      }
      if (webhookApi.consumerAccess == ConsumerAccess.RESTRICTED) {
        let groups = webhookApi.consumerGroups.map(it => new DropdownEntry(it, it))
        consumerGroupSelection = AccessGroupSelection.restricted(groups);
      }
      spec = webhookApi.spec
      approvalDetails = webhookApi.approvalDetails
    }

    this.providerGroups = new FormControl(
      providerGroupSelection,
      [AccessGroupSelection.validateFn("Select 'All' or at least one Provider Group")]
    )
    this.consumerGroups = new FormControl(
      consumerGroupSelection,
      [AccessGroupSelection.validateFn("Select 'Public' or at least one Consumer Group")]
    )
    this.spec = new FormControl(spec)
    this.requiresApproval = new FormControl(approvalDetails.required);
    this.email = new FormControl(approvalDetails.email);

    this.requiresApproval.addValidators(EmailV.requiresApprovalValidateFn(this.email, this.profileService.email))
    this.email.addValidators(EmailV.emailValidateFn(this.requiresApproval))
    const group = {
      "providerGroups": this.providerGroups,
      "consumerGroups": this.consumerGroups,
      "email": this.email,
      "requiresApproval": this.requiresApproval,
      "spec": this.spec
    }
    this.form = this.formBuilder.group(group);
  }

  providerGroups!: FormControl;
  consumerGroups!: FormControl;
  spec!: FormControl;
  email!: FormControl;
  requiresApproval!: FormControl;

  form!: FormGroup;
}

class EmailV {
  static MESSAGE = "Invalid Notification Email Address"

  private static validate(emailControl: AbstractControl, required: boolean, validationResult: any): ValidationErrors | null {
    if (required && validationResult) {
      let error: ValidationErrors = {
        error: {
          message: this.MESSAGE,
          value: emailControl.value
        }
      };
      emailControl.setErrors(error)
      return error
    }

    emailControl.setErrors(null);
    return null;
  }

  static requiresApprovalValidateFn(emailControl: FormControl, defaultValue: string): ValidatorFn {
    return (requiresApprovalControl: AbstractControl): ValidationErrors | null => {
      if(requiresApprovalControl.value) {
        if(emailControl.value.trim() == "") {
          emailControl.setValue(defaultValue)
        }
      } else {
        emailControl.setValue("")
      }
      let validationResult = Validators.email(emailControl) || Validators.required(emailControl)
      return this.validate(emailControl, requiresApprovalControl.value, validationResult)
    };
  }

  static emailValidateFn(requiresApprovalControl: FormControl): ValidatorFn {
    return (emailControl: AbstractControl): ValidationErrors | null => {
      let validationResult = Validators.email(emailControl) || Validators.required(emailControl)
      return this.validate(emailControl, requiresApprovalControl.value, validationResult)
    };
  }
}

export class AccessGroupSelection {
  constructor(
    public access: WebhookApiAccess,
    public items: Array<DropdownEntry>
  ) {
  }

  hasError(): boolean {
    return (this.access == WebhookApiAccess.RESTRICTED && this.items.length == 0);
  }

  static validateFn(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: AccessGroupSelection = control.value;
      if (value.hasError()) {
        let error: ValidationErrors = {
          error: {
            message: message,
            value: value
          }
        };
        control.setErrors(error)
        return error
      }

      return null;
    };
  }

  static initPublic(): AccessGroupSelection {
    return new AccessGroupSelection(WebhookApiAccess.PUBLIC, []);
  }

  static restricted(items: Array<DropdownEntry>): AccessGroupSelection {
    return new AccessGroupSelection(WebhookApiAccess.RESTRICTED, items);
  }
}

export enum WebhookApiAccess {
  RESTRICTED,
  PUBLIC
}
