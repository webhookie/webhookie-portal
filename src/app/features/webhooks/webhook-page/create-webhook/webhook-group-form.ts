import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SampleYML} from "./sample";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {Observable} from "rxjs";
import {ConsumerAccess, ProviderAccess} from "../../../../shared/model/access-group";

export class WebhookGroupForm {
  get value() {
    let consumerGroups: AccessGroupSelection = this.consumerGroups.value
        ? this.consumerGroups.value as AccessGroupSelection
        : {
          access: WebhookGroupAccess.PUBLIC,
          items: []
        };
    let providerGroups = this.providerGroups.value
        ? this.providerGroups.value as AccessGroupSelection
        : {
          access: WebhookGroupAccess.PUBLIC,
          items: []
        };
    return {
      "consumerGroups": consumerGroups.items.map(it => it.key),
      "providerGroups": providerGroups.items.map(it => it.key),
      "consumerAccess": (consumerGroups.access == WebhookGroupAccess.PUBLIC) ? ConsumerAccess.PUBLIC : ConsumerAccess.RESTRICTED,
      "providerAccess": (providerGroups.access == WebhookGroupAccess.PUBLIC) ? ProviderAccess.ALL : ProviderAccess.RESTRICTED,
      "asyncApiSpec": this.spec.value
    }
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

export interface AccessGroupSelection {
  access: WebhookGroupAccess;
  items: Array<DropdownEntry>
}

export enum WebhookGroupAccess {
  RESTRICTED,
  PUBLIC
}
