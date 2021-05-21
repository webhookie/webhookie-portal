import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {JsonUtils} from "../../../../../shared/json-utils";
import {Webhook} from "../../../model/webhook";

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
    let myContainer = document.getElementById('json_str') as HTMLInputElement;
    myContainer.innerHTML = inp;
    // console.log(myContainer);
  }

  changeData() {
    // noinspection JSUnusedLocalSymbols
    let myContainer = document.getElementById('json_str');
    // console.log(myContainer);
  }

  value(): any {
    return this.webhook.example;
  }
}
