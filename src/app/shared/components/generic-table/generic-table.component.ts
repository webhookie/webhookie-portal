import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GenericTable} from "./generic-table";
import {TableMasterData} from "../../model/table/table-master-data";
import {TableData} from "../../model/table/table-data";
import {TableDataSource} from "./table-data.source";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TableFilter} from "../../model/table/filter/table-filter";
import {EmptyTableFilter} from "../../model/table/filter/empty-table-filter";
import {debounceTime} from "rxjs/operators";
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
      .subscribe(() => {
        this.dataSource.reset();
        let value = this.currentPageable.value;
        let p: Pageable = new Pageable(0, value.size, value.sort)
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
}

