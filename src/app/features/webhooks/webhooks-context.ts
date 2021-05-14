import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Topic, WebhookGroup} from "./model/webhook-group";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebhooksContext {
  private readonly _webhook$: BehaviorSubject<Webhook|null> = new BehaviorSubject<Webhook | null>(null);

  readonly webhook$: Observable<Webhook|null> = this._webhook$.asObservable();

  // @ts-ignore
  private readonly _forcedWebhook$: Observable<Webhook> = this.webhook$
    .pipe(filter(it => it != null))

  readonly topic$: Observable<Topic> = this._forcedWebhook$
    .pipe(map(it => it.topic))
  readonly group$: Observable<WebhookGroup> = this._forcedWebhook$
    .pipe(map(it => it.group))

  get selectedTopic(): Topic | undefined {
    return this._webhook$.value?.topic
  }

  get topic(): Topic {
    return this._webhook$.value!.topic
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
    this.selectTopic(Webhook.create(webhookGroup));
  }

  selectTopic(webhook: Webhook) {
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

export class Webhook {
  constructor(
    public group: WebhookGroup,
    public topic: Topic
  ) {
  }

  static create(group: WebhookGroup, topic: Topic|null = null): Webhook {
    return new Webhook(group, topic ? topic : group.topics[0]);
  }
}
