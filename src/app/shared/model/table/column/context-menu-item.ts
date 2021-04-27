import {TableData} from "../table-data";

export class ContextMenuItem<T extends TableData, E> {
    constructor(
        public item: E,
        public handler: (data: T, action: E) => any,
        public isAvailable: (data: T) => boolean = () => true
    ) {
    }
}
