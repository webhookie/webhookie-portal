/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
