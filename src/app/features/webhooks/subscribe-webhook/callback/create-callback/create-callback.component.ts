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

import {Component, Input, ViewChild} from '@angular/core';
import {CallbackUrlComponent} from "../../../callback-test/callback-url/callback-url.component";
import {CallbackRequest, CallbackService} from "../../../service/callback.service";
import {WebhookieError} from "../../../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../../../shared/error/duplicate-entity-error";
import {BadRequestError} from "../../../../../shared/error/bad-request-error";
import {Callback} from "../../../../../shared/model/callback";
import {ModalService} from "../../../../../shared/service/modal.service";
import {SubscriptionContext} from "../../subscription-context";

@Component({
  selector: 'app-create-callback',
  templateUrl: './create-callback.component.html',
  styleUrls: ['./create-callback.component.css']
})
export class CreateCallbackComponent {
  // @ts-ignore
  @ViewChild("callbackComponent") callbackComponent: CallbackUrlComponent
  @Input() callback?: Callback
  @Input() noOfOtherActiveSubscriptions?: number

  constructor(
    public modalService: ModalService,
    private readonly service: CallbackService,
    private readonly context: SubscriptionContext
  ) {
  }

  get hasActiveSubscriptions(): boolean {
    if(this.noOfOtherActiveSubscriptions) {
      return this.noOfOtherActiveSubscriptions > 0
    }

    return false
  }

  get numberOfOtherSubscriptionsSharingCallback(): number {
    if(this.noOfOtherActiveSubscriptions) {
      return this.noOfOtherActiveSubscriptions
    }

    return 0
  }

  get hasMoreThanOnOtherActiveSubscription(): boolean {
    return this.numberOfOtherSubscriptionsSharingCallback > 1
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  get buttonTitle(): string {
    return this.isEditMode ? "Update" : "Create"
  }

  get isEditMode(): boolean {
    return !!this.callback
  }

  create() {
    let name = this.callbackComponent.name != ""
      ? this.callbackComponent.name
      :`${this.callbackComponent.method} ${this.callbackComponent.url}`
    let request: CallbackRequest = {
      name: name,
      applicationId: this.context.currentApplication!.id,
      httpMethod: this.callbackComponent.method,
      url: this.callbackComponent.url
    }

    if(this.callbackComponent.isHmac) {
      request.security = {
        secret: {
          keyId: this.callbackComponent.keyId,
          secret: this.callbackComponent.secret
        }
      }
    }

    let successHandler = (callback: Callback) => {
      this.context.callbackCreated(callback);
      this.modalService.hide();
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        // noinspection JSUnusedAssignment
        message = "Duplicate callback! please choose another method or url"
      } else if(error.name == BadRequestError.name) {
        // noinspection JSUnusedAssignment
        message = "Request is missing url or something else is missing. please select method and proper url"
      }
    };

    let callbackObservable = this.isEditMode
      ? this.service.updateCallback(request, this.callback!.id)
      : this.service.createCallback(request)

    callbackObservable.subscribe(successHandler, errorHandler)
  }
}
