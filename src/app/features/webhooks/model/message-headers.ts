import {MessageHeader} from "./message-header";

export class MessageHeaders {
    readonly headers: {
        [key: string]: MessageHeader
    } = {};
    readonly values: Array<MessageHeader>;

    get hasHeaders(): boolean {
        return this.values.length > 0;
    }

    constructor(
        private readonly _headers: any = {}
    ) {
        Object.keys(_headers)
            .forEach(it => this.headers[it] = new MessageHeader(it, _headers[it]));
        this.values = Object.values(this.headers)
    }
}
