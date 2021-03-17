import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-request-example',
  templateUrl: './request-example.component.html',
  styleUrls: ['./request-example.component.css']
})
export class RequestExampleComponent implements OnInit {
  // jsonobj= {"outcome" : "success", "result" : {"name" : "messaging-sockets", "default-interface" : "external", "include" : [], "socket-binding" : {"messaging" : {"name" : "messaging", "interface" : null, "port" : 5445, "fixed-port" : null, "multicast-address" : null, "multicast-port" : null}, "messaging-throughput" : {"name" : "messaging-throughput", "interface" : null, "port" : 5455, "fixed-port" : null, "multicast-address" : null, "multicast-port" : null}}}, "compensating-operation" : null};

  jsonobj=
  {
  "outcome" : "success",
  "result" : {
  "name" : "messaging-sockets",
  "default-interface" : "external",
  "include" : [],
  "socket-binding" : {
  "messaging" : {
        "name" : "messaging", 
        "interface" : null, 
        "port" : 5445, 
        "fixed-port" : null, 
        "multicast-address" : null,
        "multicast-port" : null
         },
           "messaging-throughput" : {
               "name" : "messaging-throughput", 
               "interface" : null, 
               "port" : 5455, 
               "fixed-port" : null,
                "multicast-address" : null, 
                "multicast-port" : null
            }
          }
        }, 
        "compensating-operation" : null
      };  

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () { 
      $(".custom-control-label").click(function () {
        $(".light-mode").toggleClass("dark-mode-active");
      });
  })
var str = JSON.stringify(this.jsonobj,null,'\t');

  this.output(this.syntaxHighlight(str));
}

  output(inp:string) {
    console.log(inp);
    let myContainer = document.getElementById('json_str') as HTMLInputElement;
    myContainer.innerHTML = inp;
  }

syntaxHighlight(json:string) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


}
