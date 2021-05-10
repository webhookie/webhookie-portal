import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SampleYML} from "./sample";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {Observable} from "rxjs";
import {ConsumerAccess, ProviderAccess} from "../../../../shared/model/access-group";

export class WebhookGroupForm {
  get value() {
    let consumerGroups = this.selectedConsumerGroups.value
      ? this.selectedConsumerGroups.value as Array<DropdownEntry>
      : [];
    let providerGroups = this.selectedProviderGroups.value
      ? this.selectedProviderGroups.value as Array<DropdownEntry>
      : [];
    return {
      "consumerGroups": consumerGroups.map(it => it.key),
      "providerGroups": providerGroups.map(it => it.key),
      "consumerAccess": this.publicConsumerAccess.value ? ConsumerAccess.PUBLIC : ConsumerAccess.RESTRICTED,
      "providerAccess": this.publicProviderAccess.value ? ProviderAccess.ALL : ProviderAccess.RESTRICTED,
      "asyncApiSpec": this.spec.value
    }
  }

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.selectedProviderGroups = new FormControl([])
    this.selectedConsumerGroups = new FormControl([])
    this.publicConsumerAccess = new FormControl(false)
    this.publicProviderAccess = new FormControl(false)
    this.spec = new FormControl(SampleYML.spec)
    const group = {
      "providerGroups": this.selectedProviderGroups,
      "consumerGroups": this.selectedConsumerGroups,
      "spec": this.spec,
      "publicConsumerAccess": this.publicConsumerAccess,
      "publicProviderAccess": this.publicProviderAccess,
    }
    this.form = this.formBuilder.group(group);
    this.valueChanges = this.form.valueChanges;
  }

  selectedProviderGroups!: FormControl;
  publicConsumerAccess!: FormControl;
  publicProviderAccess!: FormControl;
  selectedConsumerGroups!: FormControl;
  spec!: FormControl;

  form!: FormGroup;

  readonly valueChanges: Observable<any>;
}
