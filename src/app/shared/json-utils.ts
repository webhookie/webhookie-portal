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

  static updateElement(element: string, value: any) {
    console.warn(value);
    let type = typeof value;
    let text;
    if(type === "string") {
      try {
        let json = JSON.parse(value);
        text = JsonUtils.highlightValue(json);
      } catch (e) {
        text = JsonUtils.syntaxHighlight(value);
      }
    } else {
      text = JsonUtils.highlightValue(value);
    }
    let myContainer = document.getElementById(element) as HTMLInputElement;
    myContainer.innerHTML = text;
  }
}
