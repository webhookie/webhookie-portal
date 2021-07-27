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

  hasDetails(data: T): boolean {
    return false;
  }

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
