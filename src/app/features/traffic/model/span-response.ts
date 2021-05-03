import {HttpMessage} from "./http-message";

export class SpanResponse extends HttpMessage {
  constructor(
    public spanId: string,
    public time: Date,
    public statusCode: number,
    public contentType: string,
    public body: string,
    public headers: Map<string, any>
  ) {
    super();
  }

  get payload(): any {
    return this.body;
  }
}
