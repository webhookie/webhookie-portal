import { Component, OnInit } from '@angular/core';
import { VariableService } from 'src/app/features/webhooks/common/variable.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  sidebarList: any;
  constructor(public variable:VariableService) {
    this.sidebarList=this.variable.sideBarList;
    this.variable.selectedWebhook=this.variable.sideBarList[0].subList[0];
   }

  ngOnInit(): void {
    $(document).ready(function () {
      $("#faq a").click(function () { 
        $(this).toggleClass("active").parent().parent().siblings().find('a').removeClass('active')
      });
    });
    
  }
  Show(val:any){
    this.sidebarList[val].IsShow = !this.sidebarList[val].IsShow;
  }
  selectedWeb(sub:any){
    console.log(sub);
    this.variable.selectedWebhook=sub;
  }
}
