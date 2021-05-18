import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Topic, WebhookGroup} from "./model/webhook-group";
import {filter, map} from "rxjs/operators";
import {Webhook, WebhookSelection} from "./model/webhook";

@Injectable({
  providedIn: 'root'
})
export class WebhooksContext {
  private readonly _webhook$: BehaviorSubject<WebhookSelection|null> = new BehaviorSubject<WebhookSelection | null>(null);

  readonly webhook$: Observable<WebhookSelection|null> = this._webhook$.asObservable();

  // @ts-ignore
  private readonly _forcedWebhook$: Observable<WebhookSelection> = this.webhook$
    .pipe(filter(it => it != null))

  readonly topic$: Observable<Topic> = this._forcedWebhook$
    .pipe(map(it => it.webhook.topic))
  readonly group$: Observable<WebhookGroup> = this._forcedWebhook$
    .pipe(map(it => it.group))

  get selectedTopic(): Topic | undefined {
    return this._webhook$.value?.webhook?.topic
  }

  get webhook(): Webhook {
    return this._webhook$.value!.webhook
  }

  get group(): WebhookGroup {
    return this._webhook$.value!.group
  }

  editingWebhookGroup?: WebhookGroup;

  constructor() {
    this.webhook$
      .subscribe(() => {});
  }

  selectWebhookGroup(webhookGroup: WebhookGroup) {
    this.selectWebhook(WebhookSelection.create(webhookGroup, webhookGroup.webhooks[0]));
  }

  selectWebhook(webhook: WebhookSelection) {
    this._webhook$.next(webhook);
  }

  editingGroup(group: WebhookGroup) {
    this.editingWebhookGroup = group;
  }

  cancelEditingWebhookGroup() {
    this.editingWebhookGroup = undefined;
  }

  clearWebhookSelection() {
    this._webhook$.next(null);
  }
}

