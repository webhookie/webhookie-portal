import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {VariableService} from "../common/variable.service";
import {WebhooksContext} from "../webhooks-context";

@Component({
  selector: 'app-subscribe-webhook',
  templateUrl: './subscribe-webhook.component.html',
  styleUrls: ['./subscribe-webhook.component.css']
})
export class SubscribeWebhookComponent implements OnInit {

  subscribe: boolean = true;

  constructor(
    readonly variable: VariableService,
    public modalRef: BsModalRef,
    private modalService: BsModalService,
    private readonly context: WebhooksContext,
    private router: Router) {
  }

  ngOnInit(): void {
    this.variable.subscribe_res = false;
  }

  title() {
    return `Subscribe ${this.variable.selectedTopic?.name} to Webhook`
  }

  test() {
    this.variable.subscribe_res = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  get selectedCallback() {
    return this.context.currentCallback
  }

}
