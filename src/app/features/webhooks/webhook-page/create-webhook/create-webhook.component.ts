import {Component, OnInit} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {FormBuilder} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {WebhookGroupService} from "../../service/webhook-group.service";
import {RouterService} from "../../../../shared/service/router.service";
import {WebhookGroupForm} from "./webhook-group-form";
import {WebhookieError} from "../../../../shared/error/webhookie-error";

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

  constructor(
    private formBuilder: FormBuilder,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly router: RouterService
  ) { }

  ngOnInit(): void {
    this.webhookForm = new WebhookGroupForm(this.formBuilder);
    this.webhookForm.form.statusChanges
      .subscribe(it => {
        if(it == "INVALID") {
          this.updateError(this.webhookForm.errors());
        } else {
          this.clearError();
        }
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
    return "Create new Webhook Group"
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
        switchMap(it => this.webhookGroupService.create(it)),
      )
      .subscribe(
        () => this.router.navigateTo("/webhooks"),
        (err: WebhookieError) => this.updateError(err)
      );
  }
}
