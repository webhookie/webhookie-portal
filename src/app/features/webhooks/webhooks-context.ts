import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Topic, WebhookApi} from "./model/webhook-api";
import {filter, map} from "rxjs/operators";
import {Webhook} from "./model/webhook";
import {WebhookSelection} from "./model/webhook-selection";

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
  readonly group$: Observable<WebhookApi> = this._forcedWebhook$
    .pipe(map(it => it.api))

  get selectedTopic(): Topic | undefined {
    return this._webhook$.value?.webhook?.topic
  }

  get webhook(): Webhook {
    return this._webhook$.value!.webhook
  }

  get group(): WebhookApi {
    return this._webhook$.value!.api
  }

  editingWebhookApi?: WebhookApi;

  constructor() {
    this.webhook$
      .subscribe(() => {});
  }

  selectWebhookApi(webhookApi: WebhookApi) {
    this.selectWebhook(WebhookSelection.create(webhookApi, webhookApi.webhooks[0]));
  }

  selectWebhook(webhook: WebhookSelection) {
    this._webhook$.next(webhook);
  }

  editingGroup(api: WebhookApi) {
    this.editingWebhookApi = api;
  }

  cancelEditingWebhookApi() {
    this.editingWebhookApi = undefined;
  }

  clearWebhookSelection() {
    this._webhook$.next(null);
  }
}

