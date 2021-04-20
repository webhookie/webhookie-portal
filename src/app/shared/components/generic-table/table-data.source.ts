import {TableData} from "../../model/table/table-data";
import {TableMasterData} from "../../model/table/table-master-data";
import {EMPTY, Observable} from "rxjs";
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

export class TableDataSource {
  data: Array<TableData> = [];

  update(data: TableData[]) {
    this.data.push(...data);
  }

  reset() {
    this.data = [];
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
}
