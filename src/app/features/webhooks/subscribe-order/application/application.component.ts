import { Component, OnInit ,TemplateRef,Input} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import * as $ from 'jquery';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  constructor(public modalRef: BsModalRef,private modalService: BsModalService,) { }

  ngOnInit(): void {
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{backdrop: true,ignoreBackdropClick: true });    
  }
}
