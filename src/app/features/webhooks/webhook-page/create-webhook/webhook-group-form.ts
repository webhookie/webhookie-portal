import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
      if(consumerGroups.hasError()) {
        errors.push("Select 'Public' or at least one Consumer Group");
      }
      if(providerGroups.hasError()) {
        errors.push("Select 'All' or at least one Provider Group");
      }
      if(errors.length > 0) {
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

  constructor(
      private readonly formBuilder: FormBuilder,
  ) {
    this.providerGroups = new FormControl({})
    this.consumerGroups = new FormControl({})
    this.spec = new FormControl(SampleYML.spec)
    const group = {
      "providerGroups": this.providerGroups,
      "consumerGroups": this.consumerGroups,
      "spec": this.spec
    }
    this.form = this.formBuilder.group(group);
    this.valueChanges = this.form.valueChanges;
  }

  providerGroups!: FormControl;
  consumerGroups!: FormControl;
  spec!: FormControl;

  form!: FormGroup;

  readonly valueChanges: Observable<any>;
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
