import {Observable} from "rxjs";
import {TrafficData} from "../traffic-data";
import {TrafficTableHeader} from "./header/traffic-table-header";
import {TrafficTableFilter} from "./filter/traffic-table-filter";
import {TrafficTableColumn} from "./column/traffic-table-column";
import {Pageable} from "../../../../shared/request/pageable";

export abstract class TrafficTable<T extends TrafficData, R extends TrafficData> {
  abstract headers: Array<TrafficTableHeader>;
  abstract filters: Array<TrafficTableFilter>;
  abstract columns: Array<TrafficTableColumn>;
  abstract detailHeaders?: Array<TrafficTableHeader>;
  abstract detailColumns?: Array<TrafficTableColumn>;
  private isLoading: boolean = false;

  abstract loadDetails(data: T): void;
  abstract readonly tableData: Observable<Array<TrafficData>>;

  abstract fetchData(filter: any, pageable: Pageable): void;

  init() {
    this.tableData
      .subscribe(() => this.isLoading = false);
  }

  loadData(filter: any, pageable: Pageable) {
    this.isLoading = true;
    this.fetchData(filter, pageable);
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

  get emptySelectedRows(): boolean {
    return this.selectedRows.length == 0
  }

  get isLoadingData(): boolean {
    return this.isLoading
  }
}
