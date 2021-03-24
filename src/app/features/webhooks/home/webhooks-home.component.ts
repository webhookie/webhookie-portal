import {Component, OnInit} from '@angular/core';
import {WebhookGroupService} from "../webhook-group.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {tap} from "rxjs/operators";
import {WebhookGroup} from "../../../shared/model/webhook-group";

@Component({
  selector: 'webhooks-home',
  templateUrl: './webhooks-home.component.html',
  styleUrls: ['./webhooks-home.component.css']
})
export class WebhooksHomeComponent implements OnInit {
  groups$: Observable<WebhookGroup[]> = new Observable<WebhookGroup[]>()

  public readonly schema$: Subject<string> = new ReplaySubject<string>()

  constructor(
    private readonly service: WebhookGroupService
  ) {
  }

  ngOnInit(): void {
    this.groups$ = this.service.myWebhookGroups()
      .pipe(tap(it => this.schema$.next(it[0].spec)));
  }

  selectWebhookGroup(group: WebhookGroup) {
    this.schema$.next(group.spec);
  }
}
