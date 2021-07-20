import { Component, OnInit } from '@angular/core';
import {WebhookApiForm} from "../webhook-api-form";
import {FormBuilder} from "@angular/forms";
import {WebhooksContext} from "../../../webhooks-context";
import {Observable} from "rxjs";
import {WebhookApi} from "../../../model/webhook-api";
import {WebhookApiService} from "../../../service/webhook-api.service";
import {RouterService} from "../../../../../shared/service/router.service";
import {LogService} from "../../../../../shared/service/log.service";

@Component({
  selector: 'app-create-webhook-api',
  templateUrl: './create-webhook-api.component.html',
  styleUrls: ['./create-webhook-api.component.css']
})
export class CreateWebhookApiComponent implements OnInit {
  webhookForm!: WebhookApiForm;

  constructor(
    private readonly webhooksContext: WebhooksContext,
    private readonly webhookApiService: WebhookApiService,
    private readonly router: RouterService,
    private readonly log: LogService,
    formBuilder: FormBuilder,
  ) {
    this.webhookForm = new WebhookApiForm(formBuilder);
  }

  ngOnInit(): void {
    this.webhooksContext.cancelEditingWebhookApi();
  }

  onSave(): (request: any) => Observable<WebhookApi> {
    return (request) => {
      return this.webhookApiService.create(request);
    }
  }

  onSuccess(): (value: WebhookApi) => void {
    return (value) => {
      this.log.info(`WebhookApi: ${value.id} has been created!`);
      this.webhooksContext.editingGroup(value)
      this.router.navigateToWebhooks()
    }
  }
}
