import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, mergeMap} from "rxjs/operators";
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhooksContext} from "../../../webhooks-context";
import {WebhookGroup} from "../../../model/webhook-group";
import {Webhook} from "../../../model/webhook";
import {WebhookSelection} from "../../../model/webhook-selection";
import * as $ from "jquery";
import {StringUtils} from "../../../../../shared/string-utils";

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  readonly _webhooks$: BehaviorSubject<Array<WebhookGroup>> = new BehaviorSubject<Array<WebhookGroup>>([]);
  readonly filteredWebhook$: BehaviorSubject<Array<WebhookGroup>> = new BehaviorSubject<Array<WebhookGroup>>([]);
  readonly searchSubject$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private readonly service: WebhookGroupService,
    private readonly appContext: ApplicationContext,
    private readonly context: WebhooksContext
  ) {
  }

  ngOnInit(): void {
    this.appContext.isLoggedIn
      .pipe(mergeMap(() => this.readWebhookGroups()))
      .subscribe(it => {
        this._webhooks$.next(it)
        this.filteredWebhook$.next(it)
      });

    this.context.webhook$
      .subscribe(it => {
        $(function () {
          $("#faq div.card-header a").removeClass("active")
          $("#faq div.collapse").removeClass("show")
          $("#faq div.collapse ul li a").removeClass("portionColor")
        });

        if(it != null) {
          let id = it.group.id;
          let bodyId = `faq${id}`
          let webhookAId = this.webhookId(it.webhook)
          let groupAId = `group_a_${id}`
          $(function () {
            $(`#${bodyId}`).addClass("show");
            $(`#${groupAId}`).addClass("active");
            $(`#${webhookAId}`).addClass("portionColor");
          });
        }

      })

    this.searchSubject$
      .pipe(filter(it => it.trim() == ""))
      .subscribe(() => this.filteredWebhook$.next(this._webhooks$.value));

    this.searchSubject$
      .pipe(filter(it => it.trim().length > 2))
      .pipe(map(v => this._webhooks$.value.filter(it => it.matches(v))))
      .subscribe(it => this.filteredWebhook$.next(it));

    $(function() {
      $(".btn-header-link").on("click", function () {
        $(this)
          .toggleClass("active")
          .parent().parent().siblings().find('.btn-header-link')
          .removeClass('active')
      });
    });
  }

  get searchMode(): Observable<boolean> {
    return this.searchSubject$.asObservable()
      .pipe(map(it => it.trim().length > 2))
  }

  selectWebhook(element: WebhookGroup, webhook: Webhook) {
    this.context.selectWebhook(WebhookSelection.create(element, webhook))
  }

  private readWebhookGroups(): Observable<Array<WebhookGroup>> {
    return this.service.myWebhookGroups();
  }

  clearSelection() {
    this.context.clearWebhookSelection()
  }

  topicIsNotSelected(): boolean {
    return this.context.selectedTopic == undefined
  }

  webhookId(webhook: Webhook): string {
    return `webhook_a_${StringUtils.encode(webhook.topic.name)}`
  }

  matches(webhook: Webhook): boolean {
    return webhook.topic.matches(this.searchSubject$.value)
  }

  highlightedName(title: string): string {
    let phrase = this.searchSubject$.value;
    if(phrase.trim().length < 3) {
      return title;
    }

    return StringUtils.highlightIn(title, phrase);
  }
}
