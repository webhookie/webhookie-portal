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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GenericTable} from "./generic-table";
import {TableMasterData} from "../../model/table/table-master-data";
import {TableData} from "../../model/table/table-data";
import {TableDataSource} from "./table-data.source";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TableFilter} from "../../model/table/filter/table-filter";
import {EmptyTableFilter} from "../../model/table/filter/empty-table-filter";
import {debounceTime, mergeMap} from "rxjs/operators";
import {TableHeader} from "../../model/table/header/table-header";
import {BehaviorSubject} from "rxjs";
import {SearchListTableFilter} from "../../model/table/filter/search-list-table-filter";
import {Pageable} from "../../request/pageable";
import {TimestampTableFilter} from "../../model/table/filter/timestamp-table-filter";
import {TableSort} from "../../request/table-sort";
import * as $ from "jquery";
import {TableColumn} from "../../model/table/column/table-column";
import {SelectableTableColumn} from "../../model/table/column/selectable-table-column";

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {
  // @ts-ignore
  @Input("component") table!: GenericTable
  @Input("selectable") selectable: boolean = false
  @Input("selectActionTitle") selectActionTitle: string = ""
  @Output("selectedAction") selectedAction: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  dataSource: TableDataSource = new TableDataSource();

  showFilter: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  filtersForm!: FormGroup;
  currentFilter: BehaviorSubject<any> = new BehaviorSubject({});
  currentPageable: BehaviorSubject<Pageable> = new BehaviorSubject(Pageable.default());
  currentPage: number = 0;
  currentSort?: TableSort;

  ngOnInit(): void {
    $(function() {
      $(".common-table td a").on("click",function () {
        $("td").removeClass("active-column");
        $(this).parent().closest('td').addClass("active-column");
      });

      $(".common-table th a").on("click", function () {
        $("th").removeClass("active-column");
        $(this).parent().closest('th').addClass("active-column");
      });
    });
    this.table.init();
    this.currentFilter.next(this.table.initialFilters);

    this.table.tableData
      .subscribe((it: Array<TableData>) => {
        this.dataSource.update(it);
      });

    const group: any = {};

    this.table.filters
      .filter((it: TableFilter) => !(it instanceof EmptyTableFilter))
      .forEach((it: TableFilter) => {
        if(it instanceof TimestampTableFilter) {
          group[`${it.fromFilterName}`] = new FormControl("");
          group[`${it.toFilterName}`] = new FormControl("");
        } else {
          group[it.name] = new FormControl("");
        }
      });

    this.filtersForm = this.formBuilder.group(group);

    this.onChanges();

    this.currentFilter.asObservable()
      .pipe(mergeMap(it => this.table.readTotalNumberOfRows(it)))
    // @ts-ignore
      .subscribe((it) => this.dataSource.count$.next(it))
    this.currentFilter.asObservable()
      .subscribe(() => {
        this.dataSource.reset();
        let value = this.currentPageable.value;
        let p: Pageable = new Pageable(0, value.size, value.sort)
        this.currentPage = 0;
        this.currentPageable.next(p);
      })

    this.currentPageable.asObservable()
      .subscribe(it => {
        if(it.page == 0) {
          this.dataSource.reset();
        }
        let filter = this.currentFilter.value;
        this.table.loadData(filter, it);
      })
/*

    combineLatest([this.currentFilter, this.currentPageable])
      .subscribe(it => {
        this.table.loadData(it[0], it[1])
      });
*/
  }

  private onChanges() {
    this.filtersForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(it => {
        this.currentFilter.next(it)
      });
  }

  ngOnDestroy() {
  }

  isOpen(data: TableData) {
    if (data instanceof TableMasterData) {
      return data.isOpen
    }

    return false
  }

  sortAsc(header: TableHeader) {
    this.currentSort = TableSort.asc(header);
    this.currentPage = 0;
    this.currentPageable.next(Pageable.asc(header));
  }

  sortDesc(header: TableHeader) {
    this.currentSort = TableSort.desc(header);
    this.currentPage = 0;
    this.currentPageable.next(Pageable.desc(header));
  }

  // noinspection JSUnusedGlobalSymbols
  filterList(filter: TableFilter): any {
    if(filter instanceof SearchListTableFilter) {
      return filter.list;
    }

    return {};
  }

  formControl(filter: TableFilter) {
    // @ts-ignore
    let f: FormControl = this.filtersForm.controls[filter.name]
    return f;
  }

  onScroll() {
    if(this.table.loadMoreEnabled) {
      this.currentPage = this.currentPage + 1;
      this.currentPageable.next(new Pageable(this.currentPage, 20, this.currentSort))
    }
  }

  isSelectable(column: TableColumn, data: TableData): boolean {
    if(!this.dataSource.isSelectableColumn(column)) {
      return false;
    }

    let selectableColumn = column as SelectableTableColumn<any>

    return selectableColumn.isSelectable(data);
  }

  delete(item: TableData) {
    this.dataSource.delete(item)
  }
}

