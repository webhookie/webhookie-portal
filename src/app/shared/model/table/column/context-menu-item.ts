/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {TableData} from "../table-data";

export class ContextMenuItem<T extends TableData, E> {
  protected constructor(
    public item: E,
    public icon: string = "",
    public handler: (data: T, item: ContextMenuItem<T, E>) => any,
    public isAvailable: (data: T) => boolean = () => true
  ) {
  }

  static create<T extends TableData, E>(
    item: E,
    icon: string = "",
    handler: (data: T, item: ContextMenuItem<T,E>) => any,
    isAvailable: (data: T) => boolean = () => true
  ): ContextMenuItem<T, E> {
    return new ContextMenuItem<T, E>(item, icon, handler, isAvailable);
  }
}

export class ContextMenuItemBuilder<T extends TableData, E> {
  private readonly item: E;
  private iconName: string = "";
  private handlerFunction: (data: T, item: ContextMenuItem<T,E>) => any = () => console.error("IMPLEMENT THIS!");
  private isAvailableFunction: (data: T) => boolean = () => true;

  protected constructor(item: E) {
    this.item = item;
  }

  static create<T extends TableData, E>(item: E) {
    return new ContextMenuItemBuilder<T,E>(item);
  }

  handler(handler: (data: T, item: ContextMenuItem<T,E>) => any) {
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
