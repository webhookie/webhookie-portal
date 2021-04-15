import {Component, Input, OnInit} from '@angular/core';
import {SearchListTrafficFilter} from "../../../features/traffic/common/traffic-table/filter/search-list-traffic-filter";
import {TrafficTableFilter} from "../../../features/traffic/common/traffic-table/filter/traffic-table-filter";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input("filter") filter!: TrafficTableFilter
  @Input() control!: FormControl

  selectArr:any=[];
  selectAll:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  selectedItems(id:any){
    if(id==""){
      this.selectArr=[];
      if(!this.selectAll){
        this.selectAll=true;
        this.keys().forEach((res:string)=>{
          this.selectArr.push(res);
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

    this.control.setValue(this.selectArr);
  }

  checkedItem(val:any){
    this.selectAll=(this.list.length == this.selectArr.length);
    let index=this.selectArr.findIndex((res:any)=>res==val);
    return  (index >= 0);
  }

  keys(): Array<string> {
    return Object.keys(this.list);
  }

  valueOf(key: string): any {
    return this.list[key];
  }

  get list(): any {
    if(this.filter instanceof SearchListTrafficFilter) {
      return this.filter.list;
    }
    return {};
  }
}