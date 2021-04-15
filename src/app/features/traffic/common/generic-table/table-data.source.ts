import {TableData} from "../table-data";
import {TableMasterData} from "../table-master-data";
import {EMPTY, Observable} from "rxjs";
import {TableDetailData} from "../table-detail-data";
import {TrafficTableHeader} from "./header/traffic-table-header";
import {TableFilter} from "./filter/table-filter";
import {TableColumn} from "./column/table-column";
import {SelectableTrafficHeader} from "./header/selectable-traffic-header";
import {SortableTrafficHeader} from "./header/sortable-traffic-header";
import {SearchTableFilter} from "./filter/search-table-filter";
import {SearchListTableFilter} from "./filter/search-list-table-filter";
import {TimestampTableFilter} from "./filter/timestamp-table-filter";
import {MoreDataTableColumn} from "./column/more-data-table-column";
import {SelectableTableColumn} from "./column/selectable-table-column";

export class TableDataSource {
  data: Array<TableData> = [];

  update(data: TableData[]) {
    this.data = data;
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

  trackByHeader(index: number, filter: TrafficTableHeader) {
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

  trackByDetailHeader(index: number, item: TrafficTableHeader): string {
    return item.name
  }

  trackByDetailData(index: number, item: TableData): string {
    return item.id
  }

  trackByDetailColumn(index: number, item: TableColumn): string {
    return item.name
  }


  isSelectableHeader(header: TrafficTableHeader) {
    return header instanceof SelectableTrafficHeader
  }

  isSortableHeader(header: TrafficTableHeader) {
    return header instanceof SortableTrafficHeader
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
