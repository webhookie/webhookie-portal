import {Component, Input, OnInit} from '@angular/core';
import {JsonUtils} from "../../json-utils";
import * as $ from "jquery";
import {ModalService} from "../../service/modal.service";

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent implements OnInit {

  @Input() darkMode: boolean = true;
  @Input() showHeader: boolean = true;

  constructor(
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    $(function() {
      $(".mode-switcher")
        .on("click", function () {
          $(".light-mode").toggleClass("dark-mode-active");
        });
    });
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

  hide() {
    this.modalService.hide();
  }
}
