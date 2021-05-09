import {Component, OnInit} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, tap} from "rxjs/operators";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {WebhookGroupService} from "../../service/webhook-group.service";
import {RouterService} from "../../../../shared/service/router.service";
import {BadRequestError} from "../../../../shared/error/bad-request-error";
import {AlertService} from "../../../../shared/service/alert.service";

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css']
})
export class CreateWebhookComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'yaml'};

  selectedProviderGroups!: FormControl;
  publicConsumerAccess!: FormControl;
  publicProviderAccess!: FormControl;
  selectedConsumerGroups!: FormControl;
  spec!: FormControl;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly alertService: AlertService,
    private readonly router: RouterService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {});
  }

  title(){
    return "Create new Webhook Group"
  }

  private initForm() {
    this.selectedProviderGroups = new FormControl([])
    this.selectedConsumerGroups = new FormControl([])
    this.publicConsumerAccess = new FormControl(false)
    this.publicProviderAccess = new FormControl(false)
    this.spec = new FormControl("")
    const group = {
      "providerGroups": this.selectedProviderGroups,
      "consumerGroups": this.selectedConsumerGroups,
      "spec": this.spec,
      "publicConsumerAccess": this.publicConsumerAccess,
      "publicProviderAccess": this.publicProviderAccess,
    }
    this.form = this.formBuilder.group(group);
  }

  get specCode(): string {
    return this.spec.value;
  }

  save($event: MouseEvent) {
    let consumerGroups = this.selectedConsumerGroups.value as Array<DropdownEntry>;
    let providerGroups = this.selectedProviderGroups.value as Array<DropdownEntry>;
    let consumerAccess = this.publicConsumerAccess.value == true ? "PUBLIC" : "RESTRICTED";
    let providerAccess = this.publicProviderAccess.value == true ? "ALL" : "RESTRICTED";
    const request = {
      "consumerGroups": consumerGroups.map(it => it.key),
      "providerGroups": providerGroups.map(it => it.key),
      "consumerAccess": consumerAccess,
      "providerAccess": providerAccess,
      "asyncApiSpec": this.spec.value as string
    }

    this.webhookGroupService.create(request)
      .pipe(tap(it => console.warn(it)))
      .subscribe(
        () => this.router.navigateTo("/webhooks"),
        (err: BadRequestError) => {
          let msg = `<p></p><div>${err.message}</div><p><div>${err.body?.message}</div></p> `
          this.alertService.error(msg, err.name, {enableHtml: true, positionClass: "toast-center-center"});
        }
      );

    $event.preventDefault();
  }
}
