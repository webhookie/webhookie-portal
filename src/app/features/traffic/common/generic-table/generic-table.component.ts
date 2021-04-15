import {Component, Input, OnInit} from '@angular/core';
import {GenericTable} from "./generic-table";
import {TableMasterData} from "../table-master-data";
import {TableData} from "../table-data";
import {TableDataSource} from "./table-data.source";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TrafficTableFilter} from "./filter/traffic-table-filter";
import {EmptyTrafficFilter} from "./filter/empty-traffic-filter";
import {debounceTime} from "rxjs/operators";
import {TrafficTableHeader} from "./header/traffic-table-header";
import {BehaviorSubject, combineLatest} from "rxjs";
import {SearchListTrafficFilter} from "./filter/search-list-traffic-filter";
import {Pageable} from "../../../../shared/request/pageable";

@Component({
  selector: 'app-traffic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {
  // @ts-ignore
  @Input("component") table: GenericTable

  dataSource: TableDataSource = new TableDataSource();

  showFilter: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  filtersForm!: FormGroup;
  currentFilter: BehaviorSubject<any> = new BehaviorSubject({});
  currentPageable: BehaviorSubject<Pageable> = new BehaviorSubject(Pageable.default());

  ngOnInit(): void {
    window.addEventListener('scroll', this.onTableScroll, true);

    this.table.init();

    this.table.tableData
      .subscribe((it: Array<TableData>) => {
        this.dataSource.update(it);
      });

    const group: any = {};

    this.table.filters
      .filter((it: TrafficTableFilter) => !(it instanceof EmptyTrafficFilter))
      .forEach((it: TrafficTableFilter) => {
        group[it.name] = new FormControl("");
      });

    this.filtersForm = this.formBuilder.group(group);

    this.onChanges();

    combineLatest([this.currentFilter, this.currentPageable])
      .subscribe(it => {
        this.table.loadData(it[0], it[1])
      });
  }

  private onChanges() {
    this.filtersForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(it => {
        this.currentFilter.next(it)
      });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onTableScroll, true);
  }

  onTableScroll = (e: any): void => {
    console.log(e, "hgdjhg");
    const tableViewHeight = e.target.scrollingElement.offsetHeight
    const tableScrollHeight = e.target.scrollingElement.scrollHeight
    const scrollLocation = e.target.scrollingElement.scrollTop;
    const buffer = 100;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      console.warn("SCROLL.....")
      // let data = this.getTableData(this.start, this.end);
      // this.dataSource = this.dataSource.concat(data);
      // this.updateIndex();
    }
  }

  rowStatusArrow(data: TableData) {
    if (data instanceof TableMasterData) {
      return data.isOpen ? "assets/images/Chevron_down.svg" : "assets/images/Chevron.svg"
    }

    return "assets/images/Chevron_down.svg"
  }

  sortAsc(header: TrafficTableHeader) {
    this.currentPageable.next(Pageable.asc(header));
  }

  sortDesc(header: TrafficTableHeader) {
    this.currentPageable.next(Pageable.desc(header));
  }

  filterList(filter: TrafficTableFilter): any {
    if(filter instanceof SearchListTrafficFilter) {
      return filter.list;
    }

    return {};
  }

  formControl(filter: TrafficTableFilter) {
    // @ts-ignore
    let f: FormControl = this.filtersForm.controls[filter.name]
    return f;
  }
}

