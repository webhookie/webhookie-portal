import {Component, Input, OnInit} from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  // @ts-ignore
  @Input() headerTitle: string;

  constructor(private variable:VariableService) { }

  ngOnInit(): void {}
  title(){
    return this.headerTitle;
    // let crumbs=this.variable.breadCrumbs();
    // if(crumbs[crumbs.length-1].displayName=='Webhooks'){
    //       this.variable.showText=true;
    // }else{
    //   this.variable.showText=false;
    // }
    // return crumbs[crumbs.length-1].displayName;
  }
}
