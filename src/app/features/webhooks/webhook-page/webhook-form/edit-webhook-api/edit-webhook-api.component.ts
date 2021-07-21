import { Component, OnInit } from '@angular/core';
import {WebhookApiForm} from "../webhook-api-form";
import {FormBuilder} from "@angular/forms";
import {WebhooksContext} from "../../../webhooks-context";
import {Observable} from "rxjs";
import {WebhookApi} from "../../../model/webhook-api";
import {WebhookApiService} from "../../../service/webhook-api.service";
import {ToastService} from "../../../../../shared/service/toast.service";
import {LogService} from "../../../../../shared/service/log.service";

@Component({
  selector: 'app-edit-webhook-api',
  templateUrl: './edit-webhook-api.component.html',
  styleUrls: ['./edit-webhook-api.component.css']
})
export class EditWebhookApiComponent implements OnInit {
  webhookForm!: WebhookApiForm;

  constructor(
    private formBuilder: FormBuilder,
    private readonly log: LogService,
    private readonly webhookApiService: WebhookApiService,
    private readonly toastService: ToastService,
    private readonly webhooksContext: WebhooksContext,
  ) { }

  ngOnInit(): void {
    this.webhookForm = new WebhookApiForm(this.formBuilder, this.webhooksContext.editingWebhookApi);
  }

  onSave(): (request: any) => Observable<WebhookApi> {
    return (request) => {
      return this.webhookApiService.update(request, this.webhookForm.id)
    }
  }

  onSuccess(): (value: WebhookApi) => void {
    return (value) => {
      this.log.info(`Webhook API: ${value.id} has been saved!`);
      this.toastService.success("Webhook API has been saved successfully!", "SUCCESS")
    }
  }
}
