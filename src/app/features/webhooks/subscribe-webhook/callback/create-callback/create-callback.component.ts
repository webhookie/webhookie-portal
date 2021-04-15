import {Component, OnInit, ViewChild} from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import {WebhooksContext} from "../../../webhooks-context";
import {CallbackUrlComponent} from "../../../callback-test/callback-url/callback-url.component";
import {CallbackRequest, CallbackService} from "../../../service/callback.service";
import {WebhookieError} from "../../../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../../../shared/error/duplicate-entity-error";
import {BadRequestError} from "../../../../../shared/error/bad-request-error";
import {Callback} from "../../../../../shared/model/callback";
// import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-callback',
  templateUrl: './create-callback.component.html',
  styleUrls: ['./create-callback.component.css']
})
export class CreateCallbackComponent implements OnInit {
  // @ts-ignore
  @ViewChild("callbackComponent") callback: CallbackUrlComponent

  constructor(
    public variable: VariableService,
    private readonly service: CallbackService,
    // private readonly alertService: ToastrService,
    private readonly context: WebhooksContext
  ) {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  ngOnInit(): void {
  }

  create() {
    let request: CallbackRequest = {
      name: `${this.callback.method} ${this.callback.url}`,
      applicationId: this.context.currentApplication.id,
      httpMethod: this.callback.method,
      url: this.callback.url
    }

    if(this.callback.isHmac) {
      request.security = {
        secret: {
          keyId: this.callback.keyId,
          secret: this.callback.secret
        }
      }
    }

    let successHandler = (callback: Callback) => {
      this.context.callbackCreated(callback);
      this.variable.modalRef.hide();
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        message = "Duplicate callback! please choose another method or url"
      } else if(error.name == BadRequestError.name) {
        message = "Request is missing url or something else is missing. please select method and proper url"
      }
      // this.alertService.error(message);
    };

    this.service.createCallback(request)
      .subscribe(successHandler, errorHandler)
  }
}
