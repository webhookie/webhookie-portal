import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";

export class MessageHeader {
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
}
