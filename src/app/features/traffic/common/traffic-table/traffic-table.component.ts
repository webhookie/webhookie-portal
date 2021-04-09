import {Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {enGbLocale} from 'ngx-bootstrap/locale';
import {TrafficTableHeader} from "./header/traffic-table-header";
import {SelectableTrafficHeader} from "./header/selectable-traffic-header";
import {SortableTrafficHeader} from "./header/sortable-traffic-header";
import {TrafficTableFilter} from "./filter/traffic-table-filter";
import {SearchTrafficFilter} from "./filter/search-traffic-filter";
import {SearchListTrafficFilter} from "./filter/search-list-traffic-filter";
import {TimestampTrafficFilter} from "./filter/timestamp-traffic-filter";
import {TrafficTableColumn} from "./column/traffic-table-column";
import {MoreDataTrafficColumn} from "./column/more-data-traffic-column";
import {SelectableTrafficColumn} from "./column/selectable-traffic-column";
import {TrafficTable} from "./traffic-table";
import {TrafficMasterData} from "../traffic-master-data";
import {TrafficDetailData} from "../traffic-detail-data";

@Component({
  selector: 'app-traffic-table',
  templateUrl: './traffic-table.component.html',
  styleUrls: ['./traffic-table.component.css']
})
export class TrafficTableComponent implements OnInit {
  @Input("headers") headers: Array<TrafficTableHeader> = []
  @Input("filters") filters: Array<TrafficTableFilter> = []
  @Input("columns") columns: Array<TrafficTableColumn> = []

  // @ts-ignore
  @Input("component") table: TrafficTable


  start: number = 0;
  limit: number = 8;
  end: number = this.limit + this.start;
  showFilter:boolean=false;
  startDate: Date=new Date();
  endDate: Date=new Date();
  timepickerVisible = false;
  startTime: Date=new Date();
  endTime: Date=new Date();
  dataSource: any=[];
  dataArr:any=[
    {id:1,name:"Volvo cars"},
    {id:2,name:"Ericsion"},
    {id:3,name:"Tellia"}
  ];
  selectArr:any=[];
  selectAll:boolean=false;
  constructor(private localeService: BsLocaleService) {
    enGbLocale.weekdaysShort = ["S", "M", "T", "W", "T", "F", "S"];
    defineLocale("en-gb", enGbLocale);
  }

  ngOnInit(): void {
    this.localeService.use('en');
    window.addEventListener('scroll', this.onTableScroll, true);
    this.table.tableData
      .subscribe((it:Array<any>) => this.dataSource = it.slice(this.start, this.end));
    this.updateIndex();
    $(".time_dropdown").on("click", function(){
        $(".bottom").hide();
    });

    this.table.loadData();
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onTableScroll, true);
  }

  onTableScroll= (e:any): void => {
    console.log(e,"hgdjhg");
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

  updateIndex() {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  selectedItems(id:any){
    console.log(id);
    if(id==-1){
      this.selectArr=[];
      if(!this.selectAll){
        this.selectAll=true;
        this.dataArr.forEach((res:any)=>{
          this.selectArr.push(res.id);
        })
      }
    }else{
      let index=this.selectArr.findIndex((res:any)=>res==id);
      if(index>=0){
        this.selectArr.splice(index,1);
      }else{
        this.selectArr.push(id);
      }
    }
  }

  checkedItem(val:any){
    this.selectAll=(this.dataArr.length==this.selectArr.length)?true:false;
    let index=this.selectArr.findIndex((res:any)=>res==val.id);
    return  (index>=0)?true:false;
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

  loadDetails(data: TrafficMasterData) {
    this.table.loadDetails(data)
      .subscribe((it: Array<TrafficDetailData>) => data.details.next(it));
  }
}
