import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {Application} from "./model/application";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {WebhookGroupElement} from "./webhook-page/sidebar/sidebar-list/webhook-group-element";
import {Topic} from "./model/webhook-group";
import {Callback} from "../../shared/model/callback";

@Injectable({
  providedIn: 'root'
})
export class WebhooksContext {
  selectedWebhook?: WebhookGroupElement;
  readonly _selectedWebhookGroup: Subject<WebhookGroupElement> = new ReplaySubject()
  selectedTopic?: Topic;
  // @ts-ignore
  private readonly _selectedApplication$: BehaviorSubject<Application> = new BehaviorSubject<Application>(null);
  readonly selectedApplication$: Observable<any> = this._selectedApplication$.asObservable()
    .pipe(
      filter(it => it != null)
    );
  // @ts-ignore
  private readonly _selectedCallback$: BehaviorSubject<Callback> = new BehaviorSubject<Callback>(null);
  readonly selectedCallback$: Observable<Callback> = this._selectedCallback$.asObservable()
    .pipe(
      filter(it => it != null),
      distinctUntilChanged((x, y) => x.callbackId == y.callbackId),
    );
  readonly callbackCleared$: Observable<any> = this._selectedCallback$
    .asObservable()
    .pipe(filter(it => it == null));

  readonly _createdApplication$: Subject<Application> = new ReplaySubject<Application>();

  readonly _createdCallback$: Subject<Callback> = new ReplaySubject<Callback>();

  constructor() {
    this._selectedWebhookGroup
      .subscribe(it => this.selectWebhookGroup(it));
  }

  get currentApplication() {
    return this._selectedApplication$.value
  }

  get currentCallback() {
    return this._selectedCallback$.value
  }

  selectWebhookGroup(webhookGroup: WebhookGroupElement) {
    this.selectTopic(webhookGroup, webhookGroup.topics[0]);
  }

  selectTopic(webhookGroup: WebhookGroupElement, topic: Topic) {
    if (this.selectedWebhook) {
      this.selectedWebhook?.hide();
    }
    this.selectedWebhook = webhookGroup;
    this.selectedTopic = topic;
    webhookGroup.toggle();
  }

  applicationCreated(application: Application) {
    this._createdApplication$.next(application);
  }

  callbackCreated(callback: Callback) {
    this._createdCallback$.next(callback);
  }

  updateApplication(value: Application) {
    this._selectedApplication$.next(value);
    // @ts-ignore
    this._selectedCallback$.next(null);
  }

  updateCallback(value: Callback) {
    this._selectedCallback$.next(value);
  }

  clear() {
    // @ts-ignore
    this._selectedCallback$.next(null);
    // @ts-ignore
    this._selectedApplication$.next(null);
  }
}
