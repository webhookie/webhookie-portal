import { MessagePayload, PayloadType } from "./message-payload";

export class EnumPayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload> = [];

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    super(name, isRequired, json);
  }

  type(): string {
    return this.json.type;
  }

  values(): Array<string> {
    return this.value("enum")
      .map((it: any) => {
        if(typeof it === "string") {
          return '"' + it + '"'
        }

        return it
      })
  }
}

export class ArrayPayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload> = [];

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    super(name, isRequired, json);
  }

  type(): string {
    return `${PayloadType.ARRAY.valueOf()} | ${this.json.items.type}`;
  }
}

export class ObjectPayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload>

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any,
    props: any
  ) {
    super(name, isRequired, json);

    let requiredProperties = this.json.required ? this.json.required : [];
    Object.keys(props)
      .forEach(it => this.properties[it] = MessagePayloadFactory.create(it, requiredProperties.indexOf(it) > -1, props[it]))

    this.nestedObjects = Object.values(this.properties)
  }

  type(): string {
    return PayloadType.OBJECT.valueOf();
  }
}

export class ObjectArrayPayload extends ObjectPayload {
  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any,
    props: any
  ) {
    super(name, isRequired, json, props);
  }

  type(): string {
    return `${PayloadType.ARRAY.valueOf()} | ${this.json.items.type}`;
  }
}

export class PrimitivePayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload> = [];

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    super(name, isRequired, json);
  }

  type(): string {
    return this.json.type;
  }
}

export class MessagePayloadFactory {
  static create(name: string, isRequired: boolean, json: any): MessagePayload {
    let type = json.type
    switch (type) {
      case PayloadType.OBJECT.valueOf():
        return new ObjectPayload(name, isRequired, json, json.properties);
      case PayloadType.ARRAY.valueOf():
        if (json.items.type == PayloadType.OBJECT.valueOf()) {
          return new ObjectArrayPayload(name, isRequired, json, json.items.properties);
        }
        return new ArrayPayload(name, isRequired, json);
      default:
        if (json.enum) {
          return new EnumPayload(name, isRequired, json);
        }
    }
    return new PrimitivePayload(name, isRequired, json);
  }
}
