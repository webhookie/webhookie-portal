import {Component, OnInit} from '@angular/core';
import {WebhookGroupService} from "../features/webhooks/service/webhook-group.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {WebhookGroup} from "../features/webhooks/model/webhook-group";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  readonly _webhookGroups: Subject<Array<WebhookGroup>> = new ReplaySubject<Array<WebhookGroup>>();
  showEmptyBox: boolean = false;

  constructor(
    private readonly service: WebhookGroupService
  ) { }

  ngOnInit(): void {
    this.service.myWebhookGroups()
      .pipe(tap(it => this.showEmptyBox = it.length == 0))
      .subscribe(it => this._webhookGroups.next(it));
  }

  get isEmpty(): Observable<boolean> {
    return this._webhookGroups
      .pipe(map(it => it.length == 0))
  }

}
