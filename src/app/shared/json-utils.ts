import {HttpMessage} from "../features/traffic/model/http-message";

export class JsonUtils {
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
    let myContainer = document.getElementById('test_res') as HTMLInputElement;
    myContainer.innerHTML = JsonUtils.highlightValue(body);
  }
}