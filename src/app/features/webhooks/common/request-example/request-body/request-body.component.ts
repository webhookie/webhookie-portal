import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {JsonUtils} from "../../../../../shared/json-utils";
import {Webhook} from "../../../model/webhook";
import {Constants} from "../../../../../shared/constants";

@Component({
  selector: 'app-request-body',
  templateUrl: './request-body.component.html',
  styleUrls: ['./request-body.component.css']
})
export class RequestBodyComponent implements OnInit, AfterViewChecked {
  @Input() webhook!: Webhook
  @Input() show: boolean = true

  ngOnInit(): void {

  }

  ngAfterViewChecked(){
    const str = JSON.stringify(this.webhook.example, null, '\t');
    this.output(JsonUtils.syntaxHighlight(str));
    $(".key").attr('contentEditable', 'false');
    $(".boolean").attr('contentEditable', 'true');
    $(".string").attr('contentEditable', 'true');
    $(".null").attr('contentEditable', 'true');
    $(".number").attr('contentEditable', 'true');
  }

  output(inp: string) {
    try {
      let myContainer = document.getElementById('json_str') as HTMLInputElement;
      myContainer.innerHTML = inp;
    } catch (e) {
    }
  }

  changeData() {
    // noinspection JSUnusedLocalSymbols
    let myContainer = document.getElementById('json_str');
    // console.log(myContainer);
  }

  value(): any {
    let myContainer = document.getElementById('json_str')
    let data = this.extractContent(myContainer!.innerText);
    if(this.webhook.contentType == Constants.CONTENT_TYPE_APPLICATION_JSON) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  extractContent(s: string) {
    let span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
}
