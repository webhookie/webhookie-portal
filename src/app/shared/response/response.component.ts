import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  jsonobj = {
    "code": 200,
    "status": "success",
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
  }

  constructor(public variable: VariableService) { }

  ngOnInit(): void {
    var str = JSON.stringify(this.jsonobj.result, null, '\t');
    this.output(this.variable.syntaxHighlight(str));
  }

  output(inp: string) {
    let myContainer = document.getElementById('json_res') as HTMLInputElement;
    myContainer.innerHTML = inp;
  }
}

