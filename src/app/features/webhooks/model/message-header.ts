import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";
import {Constants} from "../../../shared/constants";

export class MessageHeader {
  static readonly readOnlyHeaders = [
    Constants.HEADER_AUTHORIZATION,
    Constants.HEADER_CONTENT_TYPE,
    Constants.HEADER_ACCEPT
  ]

  readonly props: Array<string> = Object.keys(this._props)
    .filter(it => it != "x-parser-schema-id");

  value(name: string): any {
    return this._props[name];
  }

  description(): any {
    return this.value("description")
  }

  format(): any {
    return this.value("format")
  }

  type(): any {
    return this.value("type")
  }

  example(): any {
    return sampler.generateExampleSchema(this._props)
  }

  constructor(
    public readonly name: string,
    private readonly _props: any
  ) {
  }

  isEditable(): boolean {
    return MessageHeader.readOnlyHeaders.indexOf(this.name) == -1
  }

  isReadOnly(): boolean {
    return !this.isEditable();
  }

  headerValue(): any {
    if(this.example()) {
      return this.example()
    }

    return this.placeHolder()
  }

  placeHolder() {
    if(this.format()) {
      return this.format()
    }

    if(this.type()) {
      return this.type()
    }
  }
}
