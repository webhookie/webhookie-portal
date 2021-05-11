import {Component, OnInit} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {FormBuilder} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {WebhookGroupService} from "../../service/webhook-group.service";
import {RouterService} from "../../../../shared/service/router.service";
import {WebhookGroupForm} from "./webhook-group-form";
import {WebhookieServerError} from "../../../../shared/error/webhookie-server-error";

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css']
})
export class CreateWebhookComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'yaml'};

  webhookForm!: WebhookGroupForm;
  error?: WebhookieServerError
  isCollapsed: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly router: RouterService
  ) { }

  ngOnInit(): void {
    this.webhookForm = new WebhookGroupForm(this.formBuilder);
    this.webhookForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {});
  }

  get specCode(): string {
    return this.webhookForm.spec.value;
  }

  save($event: MouseEvent) {
    this.clearError();
    console.warn(this.webhookForm.value)
    this.webhookGroupService.create(this.webhookForm.value)
      .subscribe(
        () => this.router.navigateTo("/webhooks"),
        (err: WebhookieServerError) => this.updateError(err)
      );

    $event.preventDefault();
  }

  title(){
    return "Create new Webhook Group"
  }

  updateError(err: WebhookieServerError) {
    this.error = err;
    this.isCollapsed = false;
  }

  clearError() {
    this.error = undefined;
    this.isCollapsed = true;
  }
}
