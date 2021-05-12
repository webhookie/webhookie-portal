import {Component, OnInit, ViewChild} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {FormBuilder} from "@angular/forms";
import {switchMap, take} from "rxjs/operators";
import {WebhookGroupService} from "../../service/webhook-group.service";
import {RouterService} from "../../../../shared/service/router.service";
import {WebhookGroupForm} from "./webhook-group-form";
import {WebhookieError} from "../../../../shared/error/webhookie-error";
import {WebhooksContext} from "../../webhooks-context";
import {WebhookAccessGroupComponent} from "./webhook-access-group/webhook-access-group.component";
import {ToastService} from "../../../../shared/service/toast.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css']
})
export class CreateWebhookComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'yaml'};

  webhookForm!: WebhookGroupForm;
  error: WebhookieError | null = null;
  isCollapsed: boolean = true;
  formTitle?: string

  @ViewChild("consumerGroupsComponent") consumerGroupsComponent!: WebhookAccessGroupComponent
  @ViewChild("providerGroupsComponent") providerGroupsComponent!: WebhookAccessGroupComponent

  constructor(
    private formBuilder: FormBuilder,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly webhooksContext: WebhooksContext,
    private readonly toastService: ToastService,
    private readonly router: RouterService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(it => {
        this.formTitle = it.breadcrumb;
        if(it.editMode) {
          this.webhookForm = new WebhookGroupForm(this.formBuilder, this.webhooksContext.editingWebhookGroup);
        } else {
          this.webhooksContext.cancelEditingWebhookGroup();
          this.webhookForm = new WebhookGroupForm(this.formBuilder);
        }
      });

    this.webhookForm.form.statusChanges
      .subscribe(it => {
        if(it == "INVALID") {
          this.updateError(this.webhookForm.errors());
        } else {
          this.clearError();
        }
      });

    this.webhookForm.form.valueChanges
      .pipe(take(1))
      .subscribe(() => {
        this.providerGroupsComponent.init(this.webhookForm.providerGroups.value)
        this.consumerGroupsComponent.init(this.webhookForm.consumerGroups.value)
      });
  }

  get specCode(): string {
    return this.webhookForm.spec.value;
  }

  save($event: MouseEvent) {
    this.onSubmit();
    $event.preventDefault();
  }

  title(){
    return this.formTitle ?  this.formTitle : ""
  }

  updateError(err: WebhookieError | null) {
    this.error = err;
    this.isCollapsed = false;
  }

  clearError() {
    this.error = null;
    this.isCollapsed = true;
  }

  onSubmit() {
    this.clearError();
    this.webhookForm.value()
      .pipe(
        switchMap(it => {
          if(this.webhookForm.editMode) {
            return this.webhookGroupService.update(it, this.webhookForm.id)
          } else {
            return this.webhookGroupService.create(it)
          }
        }),
      )
      .subscribe(
        () => {
          if(this.webhookForm.editMode) {
            this.toastService.success("Webhook Group has been saved successfully!", "SUCCESS")
          } else {
            this.router.navigateTo("/webhooks");
          }
        },
        (err: WebhookieError) => this.updateError(err)
      );
  }
}
