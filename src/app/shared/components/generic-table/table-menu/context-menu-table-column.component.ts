import {Component, Input, OnInit} from '@angular/core';
import {ContextMenuTableColumn} from "../../../model/table/column/context-menu-table-column";
import {TableData} from "../../../model/table/table-data";
import {TableColumn} from "../../../model/table/column/table-column";
import {ContextMenuItem} from "../../../model/table/column/context-menu-item";

@Component({
  selector: 'app-context-menu-table-column',
  templateUrl: './context-menu-table-column.component.html',
  styleUrls: ['./context-menu-table-column.component.css']
})
export class ContextMenuTableColumnComponent implements OnInit {
  @Input() column!: TableColumn;
  @Input() data!: TableData;

  constructor() { }

  ngOnInit(): void {
  }

  getMenuItems<T extends TableData,E>(): Array<ContextMenuItem<T, E>> {
    let column = this.getColumn()
    return column
      .items
      .filter(it => it.isAvailable(this.getData())) as Array<ContextMenuItem<T, E>>;
  }

  handle<T extends TableData, E>(menuItem: ContextMenuItem<T, E>) {
    menuItem.handler(this.getData(), menuItem.item)
  }

  getData<T extends TableData>(): T {
    return this.data as T;
  }

  getColumn<T extends TableData, E>(): ContextMenuTableColumn<T,E> {
    return this.column as ContextMenuTableColumn<T,E>;
  }
}
