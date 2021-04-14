import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input("list") list!: Array<string>

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
        this.list.forEach((res:string)=>{
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
  }

  checkedItem(val:any){
    this.selectAll=(this.list.length == this.selectArr.length);
    let index=this.selectArr.findIndex((res:any)=>res==val);
    return  (index >= 0);
  }
}
