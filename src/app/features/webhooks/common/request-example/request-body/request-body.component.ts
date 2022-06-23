/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {JsonUtils} from "../../../../../shared/json-utils";
import {Webhook} from "../../../model/webhook";
import {Constants} from "../../../../../shared/constants";
import {Optional} from "../../../../../shared/model/optional";

@Component({
  selector: 'app-request-body',
  templateUrl: './request-body.component.html',
  styleUrls: ['./request-body.component.css']
})
export class RequestBodyComponent implements OnInit, AfterViewChecked {
  @Input() webhook!: Webhook
  @Input() show: boolean = true
  @Input() body: Optional<any> = null

  ngOnInit(): void {

  }

  ngAfterViewChecked(){
    let str = JSON.stringify(this.webhook.example, null, '\t');
    if(this.body != null) {
      str = JSON.stringify(this.body!, null, '\t');
    }
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
