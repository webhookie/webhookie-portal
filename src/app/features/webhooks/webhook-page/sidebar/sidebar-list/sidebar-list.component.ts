import {Component, OnInit} from '@angular/core';
import {VariableService} from '../../../common/variable.service';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {filter, map, mergeMap} from "rxjs/operators";
import {WebhookGroupElement} from "./webhook-group-element";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {ApplicationContext} from "../../../../../shared/application.context";

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  readonly _webhooks$: Subject<Array<WebhookGroupElement>> = new ReplaySubject();

  constructor(
    private readonly service: WebhookGroupService,
    private readonly context: ApplicationContext,
    public variable:VariableService
  ) {
  }

  private readWebhookGroups(): Observable<Array<WebhookGroupElement>> {
    return this.service.myWebhookGroups()
      .pipe(map(list => list.map( it => new WebhookGroupElement(it.title, it.topics))))
  }

  ngOnInit(): void {
    $(function() {
      $(this).toggleClass("active").parent().parent().siblings().find('a').removeClass('active')
    });

    this.context.isLoggedIn
      .pipe(
        mergeMap(() => this.readWebhookGroups())
      )
      .subscribe(it => this._webhooks$.next(it));

    this._webhooks$.asObservable()
      .pipe(filter(it => it.length > 0))
      .subscribe(it => this.show(it[0]));
  }

  show(webhookGroup: WebhookGroupElement){
    this.variable._selectedWebhookGroup.next(webhookGroup);
  }
}
