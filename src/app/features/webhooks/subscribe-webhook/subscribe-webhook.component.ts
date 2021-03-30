import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Router}from '@angular/router'	;

@Component({
  selector: 'app-subscribe-webhook',
  templateUrl: './subscribe-webhook.component.html',
  styleUrls: ['./subscribe-webhook.component.css']
})
export class SubscribeWebhookComponent implements OnInit {

  constructor(public modalRef: BsModalRef,
    private modalService: BsModalService,
    private router:Router) { }

  ngOnInit(): void {
  }
test() {
    return true;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:'modal-dialog-centered',backdrop: true,ignoreBackdropClick: true });    
  }
}
