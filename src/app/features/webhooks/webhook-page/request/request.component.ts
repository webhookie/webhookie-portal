import {AfterViewChecked, Component} from '@angular/core';
import * as $ from 'jquery';
import {JsonUtils} from "../../../../shared/json-utils";
import {WebhookBaseComponent} from "../../common/webhook-base-component";
import {WebhooksContext} from "../../webhooks-context";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends WebhookBaseComponent implements AfterViewChecked {
  constructor(ctx: WebhooksContext) {
    super(ctx)
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".mode-switcher").click(function () {
        $(".light-mode").toggleClass("dark-mode-active");
      });
    })
  }

  ngAfterViewChecked(){
    const str = JSON.stringify(this.webhook.example, null, '\t');

    this.output(JsonUtils.syntaxHighlight(str));
  }

  output(inp: string) {
    let myContainer = document.getElementById('json_str') as HTMLInputElement;
    myContainer.innerHTML = inp;
  }

}
