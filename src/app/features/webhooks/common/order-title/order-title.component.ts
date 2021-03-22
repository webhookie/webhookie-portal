import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';
@Component({
  selector: 'app-order-title',
  templateUrl: './order-title.component.html',
  styleUrls: ['./order-title.component.css']
})
export class OrderTitleComponent implements OnInit {
  constructor(private variable:VariableService) { }

  ngOnInit(): void {}
  title(){
    let crumbs=this.variable.breadCrumbs();
    return crumbs[crumbs.length-1].displayName;
  }

}
