/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
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

import {HttpMessage} from "../features/traffic/model/http-message";

export class JsonUtils {
  static objectToString(json: object): string {
    return JSON.stringify(json, null, '\t');
  }

  static toString(str: string): string {
    try {
      return JsonUtils.objectToString(JSON.parse(str));
    } catch (e) {
      return str;
    }
  }

  static anyToString(body: any): string {
    if(typeof body === "object") {
      return JsonUtils.objectToString(body);
    } else if(typeof body === "string") {
      return JsonUtils.toString(body);
    } else {
      return body;
    }
  }

  static syntaxHighlight(json: string) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'number';
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

  static highlightValue(value: any): string {
    const str = JSON.stringify(value, null, '\t');
    return JsonUtils.syntaxHighlight(str)
  }

  static updateElementWithJson(message: HttpMessage) {
    let body = {
      payload: message.parsedPayload(),
      headers: message.headers
    }
    JsonUtils.updateElement(body)
  }

  static updateElement(json: any) {
    let myContainer = document.getElementById('test_res') as HTMLInputElement;
    myContainer.innerHTML = JsonUtils.highlightValue(json);
  }
}
