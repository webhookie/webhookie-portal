import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import {WebhooksContext} from "../../webhooks-context";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  url: any;

  constructor(
    public variable: VariableService,
    public modalRef: BsModalRef,
    private readonly context: WebhooksContext,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {

  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered modal-w',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  urlSelected(val: any) {
    this.url = val;
    this.variable.callback = true;
  }

  create() {
    this.variable.callback = true;
    this.url = 'Volvo Car';
    this.modalRef.hide();
  }
}
