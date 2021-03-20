import { Component, OnInit } from '@angular/core';
import { VariableService } from '../../variable.service';
@Component({
  selector: 'app-sub-test-dot-buttons',
  templateUrl: './sub-test-dot-buttons.component.html',
  styleUrls: ['./sub-test-dot-buttons.component.css']
})
export class SubTestDotButtonsComponent implements OnInit {

  constructor(public variable:VariableService) { }

  ngOnInit(): void {
  }
  title(){
    let crumbs=this.variable.breadCrumbs();
    console.log(crumbs,crumbs[crumbs.length-1].displayName);
    
    return crumbs[crumbs.length-1].displayName;
  }  
}
