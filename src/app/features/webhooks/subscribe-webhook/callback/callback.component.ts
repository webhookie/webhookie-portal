import { Component, OnInit ,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import{VariableService}from 'src/app/features/webhooks/common/variable.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  url: any;

  constructor(public variable: VariableService,
    public modalRef: BsModalRef,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
 
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:'modal-dialog-centered modal-w',backdrop: true,ignoreBackdropClick: true });    
  }
  urlSelected(val:any){
    this.url=val;
    this.variable.callback=true;
  }
  create(){
    this.variable.callback=true;
    this.url='Volvo Car';
    this.modalRef.hide();   
  }
}
