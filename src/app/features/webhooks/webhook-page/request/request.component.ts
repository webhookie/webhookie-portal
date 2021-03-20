import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { VariableService } from '../../common/variable.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
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

  constructor(public variable: VariableService) { }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".mode-switcher").click(function () {
        $(".light-mode").toggleClass("dark-mode-active");
      });
    })
    var str = JSON.stringify(this.jsonobj, null, '\t');

    this.output(this.variable.syntaxHighlight(str));
  }

  output(inp: string) {
    let myContainer = document.getElementById('json_str') as HTMLInputElement;
    myContainer.innerHTML = inp;
  }

}
