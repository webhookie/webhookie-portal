import {HttpMessage} from "./http-message";

export class TraceRequest extends HttpMessage{
  constructor(
    public traceId: string,
    public contentType: string,
    public payload: string,
    public headers: Map<string, any>
  ) {
    super();
  }
}
