import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestBodyComponent} from "./request-body/request-body.component";
import * as $ from 'jquery';

@Component({
  selector: 'app-request-example',
  templateUrl: './request-example.component.html',
  styleUrls: ['./request-example.component.css']
})
export class RequestExampleComponent implements OnInit {
   // @ts-ignore
   @ViewChild('requestExampleComponent') request: RequestBodyComponent
  isBody:boolean=true;
  constructor() {
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".mode-switcher").click(function () {
        $(".light-mode").toggleClass("dark-mode-active");
      });
    })
  }


}
