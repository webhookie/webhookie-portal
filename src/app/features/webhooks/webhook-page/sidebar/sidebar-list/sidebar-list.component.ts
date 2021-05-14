import {Component, OnInit} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {filter, map, mergeMap} from "rxjs/operators";
import {WebhookGroupElement} from "./webhook-group-element";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhooksContext} from "../../../webhooks-context";
import {Topic} from "../../../model/webhook-group";

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  readonly _webhooks$: Subject<Array<WebhookGroupElement>> = new ReplaySubject();

  constructor(
    private readonly service: WebhookGroupService,
    private readonly appContext: ApplicationContext,
    private readonly context: WebhooksContext
  ) {
  }

  // noinspection JSUnusedGlobalSymbols
  get selectedWebhookElement() {
    return this.context.selectedWebhook
  }

  get selectedTopic() {
    return this.context.selectedTopic
  }

  ngOnInit(): void {
    $(function () {
      $(this).toggleClass("active").parent().parent().siblings().find('a').removeClass('active')
    });

    this.appContext.isLoggedIn
      .pipe(
        mergeMap(() => this.readWebhookGroups())
      )
      .subscribe(it => this._webhooks$.next(it));

    this._webhooks$.asObservable()
      .pipe(filter(it => it.length > 0))
      .subscribe(it => this.show(it[0]));
  }

  show(webhookGroup: WebhookGroupElement) {
    this.context._selectedWebhookGroup.next(webhookGroup);
  }

  selectTopic(element: WebhookGroupElement, topic: Topic) {
    this.context.selectTopic(element, topic)
  }

  private readWebhookGroups(): Observable<Array<WebhookGroupElement>> {
    return this.service.myWebhookGroups()
      .pipe(map(list => list.map(it => WebhookGroupElement.create(it))))
  }

  clearSelection() {
    this.context.clearWebhookSelection()
  }

  topicIsNotSelected(): boolean {
    return this.context.selectedTopic == undefined
  }

  isCurrentTopic(topic: Topic) {
    return this.context.selectedTopic == topic
  }
}
