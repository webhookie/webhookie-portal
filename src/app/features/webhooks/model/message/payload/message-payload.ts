import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";
import {EnumPayload} from "./message-payload-factory";

export abstract class MessagePayload {
  private static readonly FILTERED_ITEMS = [
    "properties", "minimum", "maximum", "x-parser-schema-id", "type", "description", "format", "required", "items", "enum"
  ]

  abstract readonly nestedObjects: Array<MessagePayload>

  readonly properties: PayloadProperties = {};
  readonly keys: Array<string>

  abstract type(): string;

  isEnum(): boolean {
    return this instanceof EnumPayload;
  }

  value(key: string) {
    return this.json[key]
  }

  values() {
  }

  example(): any {
    return sampler.generateExampleSchema(this.json)
  }

  get description() {
    return this.json.description
  }

  get format() {
    return this.json.format
      ? this.json.format
      : this.json.pattern
  }

  protected constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    this.keys = Object.keys(this.json)
      .filter(it => MessagePayload.FILTERED_ITEMS.indexOf(it) == -1)
  }
}

export enum PayloadType {
  OBJECT = "object",
  ARRAY = "array",
  ENUM = "enum"
}

export interface PayloadProperties {
  [key: string]: MessagePayload;
}

