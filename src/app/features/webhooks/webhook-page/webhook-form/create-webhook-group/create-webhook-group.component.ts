import { Component, OnInit } from '@angular/core';
import {WebhookGroupForm} from "../webhook-group-form";
import {FormBuilder} from "@angular/forms";
import {WebhooksContext} from "../../../webhooks-context";
import {Observable} from "rxjs";
import {WebhookGroup} from "../../../model/webhook-group";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {RouterService} from "../../../../../shared/service/router.service";
import {LogService} from "../../../../../shared/service/log.service";

@Component({
  selector: 'app-create-webhook-group',
  templateUrl: './create-webhook-group.component.html',
  styleUrls: ['./create-webhook-group.component.css']
})
export class CreateWebhookGroupComponent implements OnInit {
  webhookForm!: WebhookGroupForm;

  constructor(
    private readonly webhooksContext: WebhooksContext,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly router: RouterService,
    private readonly log: LogService,
    formBuilder: FormBuilder,
  ) {
    this.webhookForm = new WebhookGroupForm(formBuilder);
  }

  ngOnInit(): void {
    this.webhooksContext.cancelEditingWebhookGroup();
  }

  onSave(): (request: any) => Observable<WebhookGroup> {
    return (request) => {
      return this.webhookGroupService.create(request);
    }
  }

  onSuccess(): (value: WebhookGroup) => void {
    return (value) => {
      this.log.info(`WebhookGroup: ${value.id} has been created!`);
      this.webhooksContext.editingGroup(value)
      this.router.navigateToWebhooks()
    }
  }
}
