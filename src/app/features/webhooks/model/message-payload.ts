import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";

export class MessagePayload {
  readonly properties: {
    [key: string]: MessagePayload
  } = {};

  readonly payloadType: PayloadType

  get child() {
    return Object.values(this.properties)
  }

  example(): any {
    return sampler.generateExampleSchema(this.json)
  }

  get message() {
    return this.json.description
  }

  get required() {
    return this.json.required
  }

  get type() {
    return this.json.type
  }

  get format() {
    return this.json.format
      ? this.json.format
      : this.json.pattern
  }

  constructor(
    readonly name: string,
    readonly json: any
  ) {
    this.payloadType = (this.json["type"] == "object")
      ? PayloadType.OBJECT
      : PayloadType.PRIMITIVE

    if(this.payloadType == PayloadType.OBJECT) {
      let props = this.json.properties;
      Object.keys(props)
        .forEach(it => this.properties[it] = new MessagePayload(it, props[it]))
    }
  }
}

export enum PayloadType {
  OBJECT,
  PRIMITIVE,
}
