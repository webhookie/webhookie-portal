import {Component, Input, OnInit} from '@angular/core';
import {TrafficTable} from "./traffic-table";
import {TrafficMasterData} from "../traffic-master-data";
import {TrafficData} from "../traffic-data";
import {TableDataSource} from "./table-data.source";

@Component({
  selector: 'app-traffic-table',
  templateUrl: './traffic-table.component.html',
  styleUrls: ['./traffic-table.component.css']
})
export class TrafficTableComponent implements OnInit {
  // @ts-ignore
  @Input("component") table: TrafficTable

  dataSource: TableDataSource = new TableDataSource();

  showFilter: boolean = false;

  dataArr:any=[
    {id:1,name:"Volvo cars"},
    {id:2,name:"Ericsion"},
    {id:3,name:"Tellia"}
  ];
  selectArr:any=[];
  selectAll:boolean=false;

  constructor() {
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onTableScroll, true);

    this.table.tableData
      .subscribe((it:Array<TrafficData>) =>{
        this.dataSource.update(it);
      });

    this.table.loadData();
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
    this.selectAll=(this.dataArr.length == this.selectArr.length);
    let index=this.selectArr.findIndex((res:any)=>res==val.id);
    return  (index >= 0);
  }

  rowStatusArrow(data: TrafficData) {
    if(data instanceof TrafficMasterData) {
      return data.isOpen ? "assets/images/Chevron_down.svg" : "assets/images/Chevron.svg"
    }

    return "assets/images/Chevron_down.svg"
  }
}

