import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";

export class MessageHeader {
  readonly readOnlyHeaders = ["Authorization", "Content-type", "Accept"]

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
    return this.readOnlyHeaders.indexOf(this.name) == -1
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
