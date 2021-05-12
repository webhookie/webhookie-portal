import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {SampleYML} from "./sample";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {Observable, Observer} from "rxjs";
import {ConsumerAccess, ProviderAccess} from "../../../../shared/model/access-group";
import {WebhookieError} from "../../../../shared/error/webhookie-error";

export class WebhookGroupForm {
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
      if (errors.length > 0) {
        let msg = errors.reduce((value, current) => `${value} <br/> ${current}`)
        observer.error(new WebhookieError({
          message: msg,
          name: "Webhook Group Creation Error"
        }));
      } else {
        observer.next(
            {
              "consumerGroups": consumerGroups.items.map(it => it.key),
              "providerGroups": providerGroups.items.map(it => it.key),
              "consumerAccess": (consumerGroups.access == WebhookGroupAccess.PUBLIC) ? ConsumerAccess.PUBLIC : ConsumerAccess.RESTRICTED,
              "providerAccess": (providerGroups.access == WebhookGroupAccess.PUBLIC) ? ProviderAccess.ALL : ProviderAccess.RESTRICTED,
              "asyncApiSpec": this.spec.value
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

    if(result) {
      return new WebhookieError({
        message: result,
        name: "Form Validation Error"
      })
    }

    return null;
  }

  constructor(
      private readonly formBuilder: FormBuilder,
  ) {
    this.providerGroups = new FormControl(
        AccessGroupSelection.initPublic(),
        [AccessGroupSelection.validateFn("Select 'All' or at least one Provider Group")]
    )
    this.consumerGroups = new FormControl(
        AccessGroupSelection.initPublic(),
        [AccessGroupSelection.validateFn("Select 'Public' or at least one Consumer Group")]
    )
    this.spec = new FormControl(SampleYML.spec)
    const group = {
      "providerGroups": this.providerGroups,
      "consumerGroups": this.consumerGroups,
      "spec": this.spec
    }
    this.form = this.formBuilder.group(group);
  }

  providerGroups!: FormControl;
  consumerGroups!: FormControl;
  spec!: FormControl;

  form!: FormGroup;
}

export class AccessGroupSelection {
  constructor(
    public access: WebhookGroupAccess,
    public items: Array<DropdownEntry>
  ) {
  }

  hasError(): boolean {
    return (this.access == WebhookGroupAccess.RESTRICTED && this.items.length == 0);
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
    return new AccessGroupSelection(WebhookGroupAccess.PUBLIC, []);
  }

  static restricted(items: Array<DropdownEntry>): AccessGroupSelection {
    return new AccessGroupSelection(WebhookGroupAccess.RESTRICTED, items);
  }
}

export enum WebhookGroupAccess {
  RESTRICTED,
  PUBLIC
}
