export class StringUtils {
  static truncatedUUID(id: string): string {
    let first = id.indexOf("-") + 1;
    let last = id.lastIndexOf("-");
    return id.substr(0, first) + "****" + id.substr(last, id.length);
  }
}
