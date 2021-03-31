import { Component, OnInit } from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {
   consumers:any=[
     {id:1,name:"consumer1"},
     {id:2,name:"consumer2"},
     {id:3,name:"consumer3"}
   ];
   selectArr:any=[];
   selectAll:boolean=false;
  constructor(public variable: VariableService) { }

  ngOnInit(): void {
  }

  create() {
    this.variable.modalRef.hide();
  }
  selectedItems(id:any){
    console.log(id);
    if(id==-1){
      this.selectArr=[];
      if(!this.selectAll){
        this.selectAll=true;
       
        this.consumers.forEach((res:any)=>{
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
   
     console.log(this.selectArr);
  }
  
  checkedItem(val:any){
    this.selectAll=(this.consumers.length==this.selectArr.length)?true:false;
    let index=this.selectArr.findIndex((res:any)=>res==val.id);   
    return  (index>=0)?true:false;
  }
}
