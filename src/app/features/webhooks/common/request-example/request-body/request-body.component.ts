import {AfterViewChecked, Component} from '@angular/core';
import * as $ from 'jquery';
import {JsonUtils} from "../../../../../shared/json-utils";
import {WebhookBaseComponent} from "../../webhook-base-component";
import {WebhooksContext} from "../../../webhooks-context";

@Component({
  selector: 'app-request-body',
  templateUrl: './request-body.component.html',
  styleUrls: ['./request-body.component.css']
})
export class RequestBodyComponent extends WebhookBaseComponent implements AfterViewChecked {
  constructor(ctx: WebhooksContext) {
    super(ctx)
  }

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
}
