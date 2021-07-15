import {Observable} from "rxjs";
import {BaseTableData, TableData} from "../../model/table/table-data";
import {TableHeader} from "../../model/table/header/table-header";
import {TableFilter} from "../../model/table/filter/table-filter";
import {TableColumn} from "../../model/table/column/table-column";
import {Pageable} from "../../request/pageable";
import {delay} from "rxjs/operators";

export abstract class GenericTable<T extends BaseTableData, R extends BaseTableData> {
  abstract headers: Array<TableHeader>;
  abstract filters: Array<TableFilter>;
  abstract columns: Array<TableColumn>;
  abstract detailHeaders?: Array<TableHeader>;
  abstract detailColumns?: Array<TableColumn>;
  private isLoading: boolean = false;
  loadMoreEnabled: boolean = true;
  initialFilters: any = {};

  abstract fetchDetails(data: T): Observable<boolean>;
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

  loadDetails(data: T): void {
    if(this.hasDetails(data)) {
      data.loading();
      this.fetchDetails(data)
        .pipe(delay(500))
        .subscribe(() => data.loaded());
    }
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
