import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {JsonUtils} from "../../../../../shared/json-utils";

@Component({
  selector: 'app-request-body',
  templateUrl: './request-body.component.html',
  styleUrls: ['./request-body.component.css']
})
export class RequestBodyComponent implements OnInit {
  jsonobj = {
    "outcome": "success",
    "result": {
      "name": "messaging-sockets",
      "default-interface": "external",
      "include": [],
      "socket-binding": {
        "messaging": {
          "name": "messaging",
          "interface": null,
          "port": 5445,
          "fixed-port": null,
          "multicast-address": null,
          "multicast-port": null
        },
        "messaging-throughput": {
          "name": "messaging-throughput",
          "interface": null,
          "port": 5455,
          "fixed-port": null,
          "multicast-address": null,
          "multicast-port": null
        }
      }
    },
    "compensating-operation": null
  };

  constructor() {}

  ngOnInit(): void {

  }
  ngAfterViewChecked(){
    const str = JSON.stringify(this.jsonobj, null, '\t');
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
