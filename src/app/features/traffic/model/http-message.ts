export abstract class HttpMessage {
  abstract payload: any;
  abstract headers: any;
  abstract contentType: string;

  parsedPayload(): any {
    let type = typeof this.payload;
    if(this.contentType.startsWith("application/json")) {
      if(type === "string") {
        try {
          return JSON.parse(this.payload);
        } catch (e) {
          return this.payload;
        }
      } else {
        return this.payload;
      }
    } if(this.contentType.startsWith("text/plain")) {
      return this.payload;
    }
    return this.payload;
  }
}
