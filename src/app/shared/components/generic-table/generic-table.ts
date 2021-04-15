import {Observable} from "rxjs";
import {TableData} from "../../model/table/table-data";
import {TableHeader} from "./header/table-header";
import {TableFilter} from "./filter/table-filter";
import {TableColumn} from "./column/table-column";
import {Pageable} from "../../request/pageable";

export abstract class GenericTable<T extends TableData, R extends TableData> {
  abstract headers: Array<TableHeader>;
  abstract filters: Array<TableFilter>;
  abstract columns: Array<TableColumn>;
  abstract detailHeaders?: Array<TableHeader>;
  abstract detailColumns?: Array<TableColumn>;
  private isLoading: boolean = false;

  abstract loadDetails(data: T): void;
  abstract readonly tableData: Observable<Array<TableData>>;

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

  rowSelectionChanged(column: TableColumn, data: T, $event: Event) {
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
