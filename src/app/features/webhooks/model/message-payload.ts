import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";

export class MessagePayload {
  private static readonly FILTERED_ITEMS = [
    "properties", "minimum", "maximum", "x-parser-schema-id", "type", "description", "format"
  ]

  readonly properties: {
    [key: string]: MessagePayload
  } = {};

  readonly payloadType: PayloadType
  readonly keys: Array<string>
  readonly nestedObjects: Array<MessagePayload>

  value(key: string) {
    return this.json[key]
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

    this.keys = Object.keys(this.json)
      .filter(it => MessagePayload.FILTERED_ITEMS.indexOf(it) == -1)

    this.nestedObjects = Object.values(this.properties)
  }
}

export enum PayloadType {
  OBJECT,
  PRIMITIVE,
}
