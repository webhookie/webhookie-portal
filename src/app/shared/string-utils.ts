export class StringUtils {
  static truncatedUUID(id: string): string {
    let first = id.indexOf("-") + 1;
    let last = id.lastIndexOf("-");
    return id.substr(0, first) + "****" + id.substr(last, id.length);
  }

  static encode(str: string): string {
    return str.replace(/\//g, "-")
  }

  static matchesIn(text: string, str: string): boolean {
    if(str.trim() == "") {
      return true;
    }

    return text.toLowerCase().includes(str.toLowerCase());
  }

  static highlightIn(text: string, str: string) {
    if(str.trim() == "") {
      return text;
    }

    let pattern = new RegExp(str, 'ig');
    let matches = text.match(pattern);
    if(!matches) {
      return text
    }

    let res = text;
    matches
      .forEach(it => {
        let r = new RegExp(it, "m")
        res = res.split(r).join(`<span class="text-monospace"><mark>${it}</mark></span>`);
      });

    return res

  }
}
