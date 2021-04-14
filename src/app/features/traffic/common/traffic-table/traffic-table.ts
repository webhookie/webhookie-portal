import {Observable} from "rxjs";
import {TrafficData} from "../traffic-data";
import {TrafficTableHeader} from "./header/traffic-table-header";
import {TrafficTableFilter} from "./filter/traffic-table-filter";
import {TrafficTableColumn} from "./column/traffic-table-column";
import {TableFilter} from "./filter/table-filter";

export abstract class TrafficTable<T extends TrafficData, R extends TrafficData> {
  abstract headers: Array<TrafficTableHeader>;
  abstract filters: Array<TrafficTableFilter>;
  abstract columns: Array<TrafficTableColumn>;
  abstract detailHeaders?: Array<TrafficTableHeader>;
  abstract detailColumns?: Array<TrafficTableColumn>;
  private isLoading: boolean = false;

  abstract loadDetails(data: T): void;
  abstract readonly tableData: Observable<Array<TrafficData>>;

  abstract fetchData(filters: TableFilter): void;

  init() {
    this.tableData
      .subscribe(() => this.isLoading = false);
  }

  loadData(filters: TableFilter) {
    this.isLoading = true;
    this.fetchData(filters);
  }

  selectedRows: Array<string> = [];

  rowSelectionChanged(column: TrafficTableColumn, data: T, $event: Event) {
    // @ts-ignore
    let checked: boolean = $event.currentTarget.checked;
    if(checked) {
      this.selectedRows.push(data.id);
    } else {
      this.selectedRows = this.selectedRows.filter(it => it != data.id);
    }
  }

  get disabledIfZeroSelection(): string {
    return this.selectedRows.length == 0 ? "disabled" : "";
  }

  get isLoadingData(): boolean {
    return this.isLoading
  }
}
