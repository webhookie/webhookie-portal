import { Component, OnInit ,TemplateRef,Input} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import{VariableService}from 'src/app/features/webhooks/common/variable.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  appName:any;
  Desc:any;
  appSelected: any;
  constructor(public modalRef: BsModalRef,
    private modalService: BsModalService,
    public variable: VariableService
    ) { 
      this.variable.app=false;
    }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".btn-warning").click(function () { 
        $(this).toggleClass("active").parent().parent().siblings().find('after').removeClass('active')
      });
    })

    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:'modal-dialog-centered modal-w',backdrop: true,ignoreBackdropClick: true });    
  }

  selectApp(val:any){
    this.appSelected=val;
    this.variable.app=true;
  }
  create(){
    this.appSelected='Volvo cars';
    this.variable.app=true;
    this.modalRef.hide();
  }
}
