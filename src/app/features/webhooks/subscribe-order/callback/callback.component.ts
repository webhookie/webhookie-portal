import { Component, OnInit } from '@angular/core';
import{VariableService}from 'src/app/features/webhooks/common/variable.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  url: any;

  constructor(public variable: VariableService) { }

  ngOnInit(): void {
 
  }

  urlSelected(val:any){
    this.url=val;
    this.variable.callback=true;
  }
}
