import {TableData} from "../table-data";

export class ContextMenuItem<T extends TableData, E> {
  protected constructor(
    public item: E,
    public handler: (data: T, action: E) => any,
    public isAvailable: (data: T) => boolean = () => true
  ) {
  }

  static create<T extends TableData, E>(
    item: E,
    handler: (data: T, action: E) => any,
    isAvailable: (data: T) => boolean = () => true
  ): ContextMenuItem<T, E> {
    return new ContextMenuItem<T, E>(item, handler, isAvailable);
  }
}

export class ContextMenuItemBuilder<T extends TableData, E> {
  private readonly item: E;
  private handlerFunction: (data: T, action: E) => any = () => console.error("IMPLEMENT THIS!");
  private isAvailableFunction: (data: T) => boolean = () => true;

  protected constructor(item: E) {
    this.item = item;
  }

  static create<T extends TableData, E>(item: E) {
    return new ContextMenuItemBuilder<T,E>(item);
  }

  handler(handler: (data: T, action: E) => any) {
    this.handlerFunction = handler

    return this;
  }

  isAvailable(handler: (data: T) => boolean) {
    this.isAvailableFunction = handler;

    return this;
  }

  build() {
    return ContextMenuItem.create(this.item, this.handlerFunction, this.isAvailableFunction);
  }
}
