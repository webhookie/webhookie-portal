import {TableData} from "../table-data";
import {TableMasterData} from "../table-master-data";
import {EMPTY, Observable} from "rxjs";
import {TableDetailData} from "../table-detail-data";
import {TrafficTableHeader} from "./header/traffic-table-header";
import {TrafficTableFilter} from "./filter/traffic-table-filter";
import {TableColumn} from "./column/table-column";
import {SelectableTrafficHeader} from "./header/selectable-traffic-header";
import {SortableTrafficHeader} from "./header/sortable-traffic-header";
import {SearchTrafficFilter} from "./filter/search-traffic-filter";
import {SearchListTrafficFilter} from "./filter/search-list-traffic-filter";
import {TimestampTrafficFilter} from "./filter/timestamp-traffic-filter";
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

  trackByFilter(index: number, filter: TrafficTableFilter) {
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

  isSearchFilter(filter: TrafficTableFilter) {
    return filter instanceof SearchTrafficFilter
  }

  isSearchListFilter(filter: TrafficTableFilter) {
    return filter instanceof SearchListTrafficFilter
  }

  isTimestampFilter(filter: TrafficTableFilter) {
    return filter instanceof TimestampTrafficFilter
  }

  isMoreDataColumn(column: TableColumn) {
    return column instanceof MoreDataTableColumn
  }

  isSelectableColumn(column: TableColumn) {
    return column instanceof SelectableTableColumn
  }
}
