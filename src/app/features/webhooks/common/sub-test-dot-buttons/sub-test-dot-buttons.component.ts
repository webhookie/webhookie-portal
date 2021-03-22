import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';
@Component({
  selector: 'app-sub-test-dot-buttons',
  templateUrl: './sub-test-dot-buttons.component.html',
  styleUrls: ['./sub-test-dot-buttons.component.css']
})
export class SubTestDotButtonsComponent implements OnInit {
  subscribe:boolean=false;
  constructor(public variable:VariableService) { }
  ngOnInit(): void {
  }
  title(){
    let crumbs=this.variable.breadCrumbs();   
    return crumbs[crumbs.length-1].displayName;
  }  
  test(){
    this.variable.test_res=this.title()=='Test order webhook'?true:false;
  }
}
