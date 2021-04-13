import {TrafficData} from "../traffic-data";
import {TrafficMasterData} from "../traffic-master-data";
import {EMPTY, Observable} from "rxjs";
import {TrafficDetailData} from "../traffic-detail-data";
import {TrafficTableHeader} from "./header/traffic-table-header";
import {TrafficTableFilter} from "./filter/traffic-table-filter";
import {TrafficTableColumn} from "./column/traffic-table-column";
import {SelectableTrafficHeader} from "./header/selectable-traffic-header";
import {SortableTrafficHeader} from "./header/sortable-traffic-header";
import {SearchTrafficFilter} from "./filter/search-traffic-filter";
import {SearchListTrafficFilter} from "./filter/search-list-traffic-filter";
import {TimestampTrafficFilter} from "./filter/timestamp-traffic-filter";
import {MoreDataTrafficColumn} from "./column/more-data-traffic-column";
import {SelectableTrafficColumn} from "./column/selectable-traffic-column";

export class TableDataSource {
    data: Array<TrafficData> = [];

    update(data: TrafficData[]) {
        this.data = data;
    }

    isMasterData(item: TrafficData) {
        return item instanceof TrafficMasterData
    }

    details(item: TrafficData): Observable<Array<TrafficDetailData>> {
        if (item instanceof TrafficMasterData) {
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

    trackByData(index: number, item: TrafficData): string {
        return item.id
    }

    trackByColumn(index: number, item: TrafficTableColumn): string {
        return `${index} -- ${item.name}`
    }

    trackByDetailHeader(index: number, item: TrafficTableHeader): string {
        return item.name
    }

    trackByDetailData(index: number, item: TrafficData): string {
        return item.id
    }

    trackByDetailColumn(index: number, item: TrafficTableColumn): string {
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

    isMoreDataColumn(column: TrafficTableColumn) {
        return column instanceof MoreDataTrafficColumn
    }

    isSelectableColumn(column: TrafficTableColumn) {
        return column instanceof SelectableTrafficColumn
    }
}
