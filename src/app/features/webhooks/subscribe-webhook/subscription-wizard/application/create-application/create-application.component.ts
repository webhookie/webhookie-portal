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

import {Component, OnInit} from '@angular/core';
import {WebhookieService} from "../../../../../../shared/service/webhookie.service";
import {ApplicationService, CreateApplicationRequest} from "../../../../service/application.service";
import {WebhooksContext} from "../../../../webhooks-context";
import {Application} from "../../../../model/application";
import {WebhookieError} from "../../../../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../../../../shared/error/duplicate-entity-error";
import {BadRequestError} from "../../../../../../shared/error/bad-request-error";
import {ModalService} from "../../../../../../shared/service/modal.service";
import {SubscriptionContext} from "../../../subscription-context";

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {
  requestedName: string = ""
  requestedDesc?: string

  constructor(
    private readonly service: ApplicationService,
    private readonly webhookieService: WebhookieService,
    private readonly context: WebhooksContext,
    private readonly subscriptionContext: SubscriptionContext,
    public modalService: ModalService
  ) {
  }

  ngOnInit(): void {
  }

  createApplication() {
    let request: CreateApplicationRequest = {
      name: this.requestedName,
      description: this.requestedDesc
    }

    let successHandler = (app: Application) => {
      this.subscriptionContext.applicationCreated(app);
      this.modalService.hide();
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        // noinspection JSUnusedAssignment
        message = "Duplicate application name! please choose another name"
      } else if(error.name == BadRequestError.name) {
        // noinspection JSUnusedAssignment
        message = "Request is missing name or consumer groups. please make sure to add at least 1 Consumer Group"
      }
      // this.alertService.error(message);
    };

    this.service.createApplication(request)
      .subscribe(successHandler, errorHandler)
  }
}
