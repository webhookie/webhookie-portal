import {Component, OnInit} from '@angular/core';
import {VariableService} from '../../../common/variable.service';
import {ReplaySubject, Subject} from "rxjs";
import {filter, map} from "rxjs/operators";
import {WebhookGroupElement} from "./webhook-group-element";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  readonly _webhooks$: Subject<Array<WebhookGroupElement>> = new ReplaySubject();
  sidebarList: any;
  constructor(
    private readonly service: WebhookGroupService,
    public variable:VariableService
  ) {
    this.sidebarList=this.variable.sideBarList;
    this.variable.selectedWebhook=this.variable.sideBarList[0].subList[0];
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $("#faq a").click(function () { 
        $(this).toggleClass("active").parent().parent().siblings().find('a').removeClass('active')
      });
    });

    this.service.myWebhookGroups()
      .pipe(map(list => list.map( it => new WebhookGroupElement(it.title, it.topics))))
      .subscribe(it => this._webhooks$.next(it));

    this._webhooks$.asObservable()
      .pipe(filter(it => it.length > 0))
      .subscribe(it => this.show(it[0]));

  }

  show(webhookGroup: WebhookGroupElement){
    this.variable._selectedWebhookGroup.next(webhookGroup);
  }
  selectedWeb(sub:any){
    console.log(sub);
    this.variable.selectedWebhook=sub;
  }
}
