import {Component, Input, OnInit} from '@angular/core';
import {ContextMenuTableColumn} from "../../../model/table/column/context-menu-table-column";
import {TableData} from "../../../model/table/table-data";
import {TableColumn} from "../../../model/table/column/table-column";
import {ContextMenuItem} from "../../../model/table/column/context-menu-item";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  @Input() set column(col: TableColumn) {
    let column = col as ContextMenuTableColumn<any, any>
    this.menuItems = column.items;
  };
  @Input() data!: TableData;
  @Input() menuItems!: Array<ContextMenuItem<any, any>>;

  constructor() { }

  ngOnInit(): void {
  }

  getMenuItems<T extends TableData,E>(): Array<ContextMenuItem<T, E>> {
    return this.menuItems
      .filter(it => it.isAvailable(this.getData())) as Array<ContextMenuItem<T, E>>;
  }

  handle<T extends TableData, E>(menuItem: ContextMenuItem<T, E>) {
    menuItem.handler(this.getData(), menuItem)
  }

  getData<T extends TableData>(): T {
    return this.data as T;
  }

  hasIcon(item: ContextMenuItem<any, any>) : boolean {
    return item.icon != "";
  }
}
