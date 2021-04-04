import {Component, OnInit, ViewChild} from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import {WebhooksContext} from "../../../webhooks-context";
import {CallbackUrlComponent} from "../../../callback-test/callback-url/callback-url.component";
import {CallbackRequest, CallbackService} from "../../../service/callback.service";

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
    private readonly context: WebhooksContext
  ) {
  }

  ngOnInit(): void {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  create() {
    let appId = this.context.currentApplication.id
    let request: CallbackRequest = {
      name: `${appId} Callback`,
      applicationId: appId,
      httpMethod: this.callback.method,
      url: this.callback.url
    }

    this.service.createCallback(request)
      .subscribe(it => {
        console.warn(it);
        this.context.updateCallback(it);
        this.variable.modalRef.hide();
      })
  }
}
