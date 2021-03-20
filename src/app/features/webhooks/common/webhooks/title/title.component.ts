import { Component, OnInit } from '@angular/core';
import { VariableService } from '../../variable.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(private variable:VariableService) { }

  ngOnInit(): void {}
  title(){
    let crumbs=this.variable.breadCrumbs();
    if(crumbs[crumbs.length-1].displayName=='Webhooks'){
          this.variable.showText=true;
    }else{
      this.variable.showText=false;
    }
    return crumbs[crumbs.length-1].displayName;
  }
}
