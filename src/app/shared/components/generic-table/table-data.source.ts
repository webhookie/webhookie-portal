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

import {TableData} from "../../model/table/table-data";
import {TableMasterData} from "../../model/table/table-master-data";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {TableDetailData} from "../../model/table/table-detail-data";
import {TableHeader} from "../../model/table/header/table-header";
import {TableFilter} from "../../model/table/filter/table-filter";
import {TableColumn} from "../../model/table/column/table-column";
import {SelectableTableHeader} from "../../model/table/header/selectable-table-header";
import {SortableTableHeader} from "../../model/table/header/sortable-table-header";
import {SearchTableFilter} from "../../model/table/filter/search-table-filter";
import {SearchListTableFilter} from "../../model/table/filter/search-list-table-filter";
import {TimestampTableFilter} from "../../model/table/filter/timestamp-table-filter";
import {MoreDataTableColumn} from "../../model/table/column/more-data-table-column";
import {SelectableTableColumn} from "../../model/table/column/selectable-table-column";
import {ContextMenuTableColumn} from "../../model/table/column/context-menu-table-column";

export class TableDataSource {
  data$: BehaviorSubject<Array<TableData>> = new BehaviorSubject<Array<TableData>>([]);

  update(data: TableData[]) {
    let d = this.data$.value
    d.push(...data)
    this.data$.next(d);
  }

  delete(item: TableData) {
    let updatedList = this.data$.value
      .filter(value => value.id != item.id)

    this.data$.next(updatedList)
  }

  reset() {
    this.data$.next([]);
  }

  numberOfRows(): number {
    return this.data$.value.length
  }

  isMasterData(item: TableData) {
    return item instanceof TableMasterData
  }

  details(item: TableData): Observable<Array<TableDetailData>> {
    if (item instanceof TableMasterData) {
      return item.details
    }

    return EMPTY
  }

  trackByHeader(index: number, filter: TableHeader) {
    return filter.name;
  }

  trackByFilter(index: number, filter: TableFilter) {
    return filter.name;
  }

  trackByData(index: number, item: TableData): string {
    return item.id
  }

  trackByColumn(index: number, item: TableColumn): string {
    return `${index} -- ${item.name}`
  }

  trackByDetailHeader(index: number, item: TableHeader): string {
    return item.name
  }

  trackByDetailData(index: number, item: TableData): string {
    return item.id
  }

  trackByDetailColumn(index: number, item: TableColumn): string {
    return item.name
  }


  isSelectableHeader(header: TableHeader) {
    return header instanceof SelectableTableHeader
  }

  isSortableHeader(header: TableHeader) {
    return header instanceof SortableTableHeader
  }

  isSearchFilter(filter: TableFilter) {
    return filter instanceof SearchTableFilter
  }

  isSearchListFilter(filter: TableFilter) {
    return filter instanceof SearchListTableFilter
  }

  isTimestampFilter(filter: TableFilter) {
    return filter instanceof TimestampTableFilter
  }

  isMoreDataColumn(column: TableColumn) {
    // noinspection SuspiciousTypeOfGuard
    return column instanceof MoreDataTableColumn
  }

  isSelectableColumn(column: TableColumn) {
    return column instanceof SelectableTableColumn
  }

  isContextMenuColumn(column: TableColumn) {
    return column instanceof ContextMenuTableColumn
  }
}
