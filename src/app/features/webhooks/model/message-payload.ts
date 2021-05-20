import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";

export class MessagePayload {
  private static readonly FILTERED_ITEMS = [
    "properties", "minimum", "maximum", "x-parser-schema-id", "type", "description", "format", "required", "items", "enum"
  ]

  readonly properties: {
    [key: string]: MessagePayload
  } = {};

  readonly keys: Array<string>
  readonly nestedObjects: Array<MessagePayload>
  readonly type: PayloadPropertyType

  value(key: string) {
    return this.json[key]
  }

  enumValues() {
    if(this.type.isEnum()) {
      let value = this.value("enum")
      return value
        .map((it: string) => '"' + it + '"')
    }
    return []
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

  get format() {
    return this.json.format
      ? this.json.format
      : this.json.pattern
  }

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    this.type = PayloadPropertyType.create(this.json)

    if(this.type.isObject()) {
      let requiredProperties = this.json.required ? this.json.required : [];
      let props = this.json.properties;
      Object.keys(props)
        .forEach(it => this.properties[it] = new MessagePayload(it, requiredProperties.indexOf(it) > -1, props[it]))
    }

    if(this.type.isObjectArray()) {
      let requiredProperties = this.json.required ? this.json.required : [];
      let props = this.json.items.properties;
      Object.keys(props)
        .forEach(it => this.properties[it] = new MessagePayload(it, requiredProperties.indexOf(it) > -1, props[it]))
    }

    this.keys = Object.keys(this.json)
      .filter(it => MessagePayload.FILTERED_ITEMS.indexOf(it) == -1)

    this.nestedObjects = Object.values(this.properties)
  }
}

export enum PayloadType {
  OBJECT = "object",
  ARRAY = "array",
  ENUM = "enum",
  PRIMITIVE = "primitive"
}

export class PayloadPropertyType {
  constructor(
    public mainType: PayloadType,
    public subType?: string
  ) {
  }

  isObject(): boolean {
    return this.mainType == PayloadType.OBJECT
  }

  isObjectArray(): boolean {
    return this.mainType == PayloadType.ARRAY && this.subType == PayloadType.OBJECT
  }

  isPrimitiveArray(): boolean {
    return this.mainType == PayloadType.ARRAY && this.subType != PayloadType.OBJECT
  }

  isEnum(): boolean {
    return this.mainType == PayloadType.ENUM
  }

  title(): string {
    switch (this.mainType) {
      case PayloadType.OBJECT:
        return this.mainType.valueOf()!;
      case PayloadType.ARRAY:
        return `${this.mainType.valueOf()} | ${this.subType!}`
      case PayloadType.ENUM:
        return this.mainType.valueOf()
      default:
        return this.subType!;
    }
  }

  static create(json: any): PayloadPropertyType {
    let type = json.type
    switch (type) {
      case PayloadType.OBJECT.valueOf():
        return PayloadPropertyType.object();
      case PayloadType.ARRAY.valueOf():
        return PayloadPropertyType.array(json.items.type);
      default:
        if(json.enum) {
          return PayloadPropertyType.enum(type);
        }
        return PayloadPropertyType.primitive(type);
    }
  }

  static primitive(subType: string): PayloadPropertyType {
    return new PayloadPropertyType(PayloadType.PRIMITIVE, subType)
  }

  static array(subType: string): PayloadPropertyType {
    return new PayloadPropertyType(PayloadType.ARRAY, subType)
  }

  static enum(subType: string): PayloadPropertyType {
    return new PayloadPropertyType(PayloadType.ENUM, subType)
  }

  static object(): PayloadPropertyType {
    return new PayloadPropertyType(PayloadType.OBJECT)
  }
}
