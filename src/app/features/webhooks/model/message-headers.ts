import {MessageHeader} from "./message-header";
import {Constants} from "../../../shared/constants";

export class MessageHeaders {
  headers: {
    [key: string]: MessageHeader
  } = {};

  get hasHeaders(): boolean {
    return this.values.length > 0;
  }

  setHeader(key: string, type: string = "string", description: string | null) {
    this.headers[key] = new MessageHeader(key, { type: type, description: description})
  }

  get values(): Array<MessageHeader> {
    return Object.values(this.headers);
  }

  constructor(
    private readonly _headers: any = {}
  ) {

    Object.keys(_headers)
      .forEach(it => this.headers[it] = new MessageHeader(it, _headers[it]));
  }

  setContentType(contentType: string) {
    this.setHeader(Constants.HEADER_CONTENT_TYPE, "string", "Message content type");
  }
}
