import {Component, OnInit} from '@angular/core';
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {map, mergeMap, tap} from "rxjs/operators";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {WebhookGroup} from "../../../model/webhook-group";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  readonly _webhookGroups: Subject<Array<WebhookGroup>> = new ReplaySubject<Array<WebhookGroup>>();
  showEmptyBox: boolean = false;

  constructor(
    private readonly appContext: ApplicationContext,
    private readonly service: WebhookGroupService
  ) { }

  ngOnInit(): void {
    this.appContext.isLoggedIn
      .pipe(
        mergeMap(() => this.service.myWebhookGroups()),
        tap(it => this.showEmptyBox = it.length == 0)
      )
      .subscribe(it => this._webhookGroups.next(it));
  }

  get isEmpty(): Observable<boolean> {
    return this._webhookGroups
      .pipe(map(it => it.length == 0))
  }

}
