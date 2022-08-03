/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {Component, Input} from '@angular/core';
import {ContextMenuTableColumn} from "../../model/table/column/context-menu-table-column";
import {TableData} from "../../model/table/table-data";
import {TableColumn} from "../../model/table/column/table-column";
import {ContextMenuItem} from "../../model/table/column/context-menu-item";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  @Input() set column(col: TableColumn) {
    let column = col as ContextMenuTableColumn<any, any>
    this.menuItems = column.items;
  };
  @Input() data!: TableData;
  @Input() menuItems!: Array<ContextMenuItem<any, any>>;
  @Input() isVertical: boolean = false

  getMenuItems<T extends TableData,E>(): Array<ContextMenuItem<T, E>> {
    return this.menuItems
      .filter(it => it.isAvailable(this.getData())) as Array<ContextMenuItem<T, E>>;
  }

  trackByHeader<T extends TableData,E>(index: number, filter: ContextMenuItem<T, E>) {
    // @ts-ignore
    return filter.item.id;
  }

  get hasItem(): boolean {
    return this.getMenuItems().length > 0
  }

  handle<T extends TableData, E>(menuItem: ContextMenuItem<T, E>) {
    if(menuItem.isAvailable(this.getData())) {
      menuItem.handler(this.getData(), menuItem);
    }
  }

  getData<T extends TableData>(): T {
    return this.data as T;
  }

  hasIcon(item: ContextMenuItem<any, any>) : boolean {
    return item.icon != "";
  }
}
