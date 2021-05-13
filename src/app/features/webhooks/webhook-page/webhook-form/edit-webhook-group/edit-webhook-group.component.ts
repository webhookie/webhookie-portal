import { Component, OnInit } from '@angular/core';
import {WebhookGroupForm} from "../webhook-group-form";
import {FormBuilder} from "@angular/forms";
import {WebhooksContext} from "../../../webhooks-context";
import {Observable} from "rxjs";
import {WebhookGroup} from "../../../model/webhook-group";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {ToastService} from "../../../../../shared/service/toast.service";
import {LogService} from "../../../../../shared/service/log.service";

@Component({
  selector: 'app-edit-webhook-group',
  templateUrl: './edit-webhook-group.component.html',
  styleUrls: ['./edit-webhook-group.component.css']
})
export class EditWebhookGroupComponent implements OnInit {
  webhookForm!: WebhookGroupForm;

  constructor(
    private formBuilder: FormBuilder,
    private readonly log: LogService,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly toastService: ToastService,
    private readonly webhooksContext: WebhooksContext,
  ) { }

  ngOnInit(): void {
    this.webhookForm = new WebhookGroupForm(this.formBuilder, this.webhooksContext.editingWebhookGroup);
  }

  onSave(): (request: any) => Observable<WebhookGroup> {
    return (request) => {
      return this.webhookGroupService.update(request, this.webhookForm.id)
    }
  }

  onSuccess(): (value: WebhookGroup) => void {
    return (value) => {
      this.log.info(`WebhookGroup: ${value.id} has been saved!`);
      this.toastService.success("Webhook Group has been saved successfully!", "SUCCESS")
    }
  }
}
