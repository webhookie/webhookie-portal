import {Component, Input, OnInit} from '@angular/core';
import {TraceService}from 'src/app/features/traffic/service/trace.service';
import * as $ from 'jquery';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import {TrafficTableHeader} from "./header/traffic-table-header";
import {SelectableTrafficHeader} from "./header/selectable-traffic-header";
import {SortableTrafficHeader} from "./header/sortable-traffic-header";
import {FilterTrafficHeader} from "./header/filter-traffic-header";
@Component({
  selector: 'app-traffic-table',
  templateUrl: './traffic-table.component.html',
  styleUrls: ['./traffic-table.component.css']
})
export class TrafficTableComponent implements OnInit {
  @Input("headers") headers: Array<TrafficTableHeader> = []

  start: number = 0;
  limit: number = 8;
  end: number = this.limit + this.start;
  showFilter:boolean=false;
  startDate: Date=new Date();
  endDate: Date=new Date();
  timepickerVisible = false;
  startTime: Date=new Date();
  endTime: Date=new Date();
  tableData:any=[
    {
      id:1,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1
    } ,
    {
      id:2,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:3,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:4,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    },
    {
      id:5,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:6,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:7,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:8,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:9,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:10,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    },
    {
      id:11,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    } ,
    {
      id:12,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,{
      id:13,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,{
      id:14,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,{
      id:15,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    },
    {
      id:16,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,
    {
      id:17,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,
    {
      id:18,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,
    {
      id:19,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    },
    {
      id:20,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,{
      id:21,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,{
      id:22,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }  ,{
      id:23,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    },
    {
      id:25,
      trace_id:'1kl32jl12khkj3h123rk',
      application: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      auth_subscriber: 'Volvo',
      timestamp:'14 January 2021' ,
      timestatus: 'Processing',
      status_desc: 'Processing',
      span_id: 1,
      res_code: 200,
      status: 'Processing',
      tries: 1,
    }

  ]
  spanData:any=[
    { id:1,
      span_id:1,
      company: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      timestatus: 'Processing',
      res_code: 200,
      status: 'Processing',
      tries: 1
    },
    {
      id:2,
      span_id:1,
      company: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      timestatus: 'Processing',
      res_code: 200,
      status: 'Processing',
      tries: 1
    },
    {
      id:3,
      span_id:1,
      company: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      timestatus: 'Processing',
      res_code: 200,
      status: 'Processing',
      tries: 1
    },
    {
      id:4,
      span_id:1,
      company: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      timestatus: 'Processing',
      res_code: 200,
      status: 'Processing',
      tries: 1
    },
    {
      id:6,
      span_id:1,
      company: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      timestatus: 'Processing',
      res_code: 200,
      status: 'Processing',
      tries: 1
    },
    {
      id:7,
      span_id:1,
      company: 'Volvo cars',
      webhook: 'Order',
      callback_url:'https://www.volvocars.com/se' ,
      timestatus: 'Processing',
      res_code: 200,
      status: 'Processing',
      tries: 1
    }
  ]
  dataSource: any=[];
  dataArr:any=[
    {id:1,name:"Volvo cars"},
    {id:2,name:"Ericsion"},
    {id:3,name:"Tellia"}
  ];
  selectArr:any=[];
  selectAll:boolean=false;
  constructor(public trace:TraceService,private localeService: BsLocaleService) {
    enGbLocale.weekdaysShort = ["S", "M", "T", "W", "T", "F", "S"];
    defineLocale("en-gb", enGbLocale);
  }

  ngOnInit(): void {
    this.localeService.use('en');
    window.addEventListener('scroll', this.onTableScroll, true);
    this.dataSource = this.getTableData(this.start, this.end);
    this.updateIndex();
    $(".time_dropdown").on("click", function(){
        $(".bottom").hide();
    });
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
      let data = this.getTableData(this.start, this.end);
      this.dataSource = this.dataSource.concat(data);
      this.updateIndex();
    }
  }

  getTableData(start:any, end:any) {
    return this.tableData.filter((value:any, index:any) => index >= start && index < end)
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

  isFilterHeader(header: TrafficTableHeader) {
    return header instanceof FilterTrafficHeader
  }
}
