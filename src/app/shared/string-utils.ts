export class StringUtils {
  static truncatedUUID(id: string): string {
    const MAX_LEN = 20
    if(id.length <= MAX_LEN) {
      return id;
    }

    if(!id.includes("-")) {
      return id.substr(0, MAX_LEN).concat("...");
    }

    let first = id.indexOf("-") + 1;
    let last = id.lastIndexOf("-");
    return id.substr(0, first) + "..." + id.substr(last, id.length);
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
    let uniqueMatches = new Set(matches);
    uniqueMatches
      .forEach(it => {
        let r = new RegExp(it, "g")
        res = res.split(r).join(`<span class="text-monospace"><mark>${it}</mark></span>`);
      });

    return res

  }
}
