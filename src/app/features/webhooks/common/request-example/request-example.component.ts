import {Component, OnInit, ViewChild} from '@angular/core';
import {VariableService} from '../variable.service';
import * as $ from 'jquery';
import {RequestBodyComponent} from "./request-body/request-body.component";
@Component({
  selector: 'app-request-example',
  templateUrl: './request-example.component.html',
  styleUrls: ['./request-example.component.css']
})
export class RequestExampleComponent implements OnInit {
   // @ts-ignore
   @ViewChild('requestExampleComponent') request: RequestBodyComponent
  isBody:boolean=true;
  constructor(public variable: VariableService,) {
  }

  ngOnInit(): void {
  }

 
}
