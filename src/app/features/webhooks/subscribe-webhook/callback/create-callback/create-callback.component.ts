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

  constructor(
    public modalService: ModalService,
    private readonly service: CallbackService,
    private readonly context: SubscriptionContext
  ) {
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
