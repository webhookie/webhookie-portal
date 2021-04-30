import { Component, OnInit } from '@angular/core';
import {JsonUtils} from "../../json-utils";

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showHtml(body: any) {
    const str = JSON.stringify(body, null, '\t');
    let json = JsonUtils.syntaxHighlight(str)
    let myContainer = document.getElementById('test_res') as HTMLInputElement;
    myContainer.innerHTML = json;
  }

  show(body: any) {
    let myContainer = document.getElementById('test_res') as HTMLInputElement;
    myContainer.innerText = body;
  }

  clear() {
    this.show("");
  }
}
