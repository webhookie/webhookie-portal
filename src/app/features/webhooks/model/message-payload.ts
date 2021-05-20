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
  open: boolean;

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

  get hasChildAttributes(): boolean {
    return (this.keys.length > 0 && (this.message != undefined)) || this.nestedObjects.length > 0
  }

  get emptyAttributes(): boolean {
    return !this.hasChildAttributes
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

    this.open = false;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  close() {
    this.nestedObjects.forEach(it => it.close());
    this.open = false;
  }
}

export enum PayloadType {
  OBJECT,
  PRIMITIVE,
}
