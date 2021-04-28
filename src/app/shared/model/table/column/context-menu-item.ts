import {TableData} from "../table-data";

export class ContextMenuItem<T extends TableData, E> {
  protected constructor(
    public item: E,
    public icon: string = "",
    public handler: (data: T, action: E) => any,
    public isAvailable: (data: T) => boolean = () => true
  ) {
  }

  static create<T extends TableData, E>(
    item: E,
    icon: string = "",
    handler: (data: T, action: E) => any,
    isAvailable: (data: T) => boolean = () => true
  ): ContextMenuItem<T, E> {
    return new ContextMenuItem<T, E>(item, icon, handler, isAvailable);
  }
}

export class ContextMenuItemBuilder<T extends TableData, E> {
  private readonly item: E;
  private iconName: string = "";
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

  icon(value: string) {
    this.iconName = value

    return this;
  }

  isAvailable(handler: (data: T) => boolean) {
    this.isAvailableFunction = handler;

    return this;
  }

  build() {
    return ContextMenuItem.create(this.item, this.iconName, this.handlerFunction, this.isAvailableFunction);
  }
}
