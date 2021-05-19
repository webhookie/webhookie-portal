import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";

export class MessagePayload {
  readonly properties: {
    [key: string]: MessagePayload
  } = {};
  readonly type: PayloadType

  example(): any {
    return sampler.generateExampleSchema(this.json)
  }

  constructor(
    readonly json: any
  ) {
    this.type = (this.json["type"] == "object")
      ? PayloadType.OBJECT
      : PayloadType.PRIMITIVE

    if(this.type == PayloadType.OBJECT) {
      let props = this.json.properties;
      Object.keys(props)
        .forEach(it => this.properties[it] = new MessagePayload(props[it]))
    }
  }
}

export enum PayloadType {
  OBJECT,
  PRIMITIVE,
}
