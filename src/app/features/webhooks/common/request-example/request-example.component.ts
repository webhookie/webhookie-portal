import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RequestBodyComponent} from "./request-body/request-body.component";
import * as $ from 'jquery';
import {RequestHeadersComponent} from "./request-headers/request-headers.component";
import {Webhook} from "../../model/webhook";

@Component({
  selector: 'app-request-example',
  templateUrl: './request-example.component.html',
  styleUrls: ['./request-example.component.css']
})
export class RequestExampleComponent implements OnInit {
  @Input() webhook!: Webhook
  @ViewChild('bodyComponent') bodyComponent!: RequestBodyComponent
  @ViewChild('headersComponent') headersComponent!: RequestHeadersComponent

  isBody: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    $(function() {
      $(".mode-switcher").on("click", function () {
        $(".light-mode").toggleClass("dark-mode-active");
      });
    });
  }

  value(extraHeaders: any): any {
    return {
      payload: this.bodyComponent.value(),
      headers: this.headersComponent.value(extraHeaders)
    }
  }

  valueEx(): any {
    return {
      payload: this.bodyComponent.value(),
      headers: this.headersComponent.value({})
    }
  }

  showBody() {
    this.isBody = true
    this.bodyComponent.show = true
    this.headersComponent.show = false
  }

  showHeaders() {
    this.isBody = false
    this.bodyComponent.show = false
    this.headersComponent.show = true
  }
}
