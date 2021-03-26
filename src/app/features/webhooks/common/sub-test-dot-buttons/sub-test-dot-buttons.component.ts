import { Component, OnInit,TemplateRef } from '@angular/core';
import { VariableService } from '../variable.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Router}from '@angular/router'	;

@Component({
  selector: 'app-sub-test-dot-buttons',
  templateUrl: './sub-test-dot-buttons.component.html',
  styleUrls: ['./sub-test-dot-buttons.component.css']
})
export class SubTestDotButtonsComponent implements OnInit {
  subscribe:boolean=true;
  constructor(public variable:VariableService,public modalRef: BsModalRef,
    private modalService: BsModalService,
    private router:Router) { }
  ngOnInit(): void {
  }
  title(){
    let crumbs=this.variable.breadCrumbs();   
    return crumbs[crumbs.length-1].displayName;
  }  
  test(){
    if(this.title()=='Test order webhook'){  
      this.router.navigateByUrl('/webhooks/test-order/'+this.variable.selectedWebhook.id);    
      this.variable.test_res=true;
    }
    if(this.title()=='Subscribe to order webhook'){
      this.variable.subscribe_res=true;
    }
    if(this.title()=='Webhooks'){
      this.router.navigateByUrl('/webhooks/test-order/'+this.variable.selectedWebhook.id);
      this.variable.test_res=false;
      this.variable.appName='';
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:'modal-dialog-centered',backdrop: true,ignoreBackdropClick: true });    
  }
}
