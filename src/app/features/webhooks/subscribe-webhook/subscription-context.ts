import {Application} from "../model/application";
import {Callback} from "../../../shared/model/callback";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {Subscription} from "../../../shared/model/subscription";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionContext {
  private readonly _selectedApplication$: BehaviorSubject<Application|undefined> = new BehaviorSubject<Application|undefined>(undefined);
  // @ts-ignore
  readonly selectedApplication$: Observable<Application> = this._selectedApplication$.asObservable()
    .pipe(filter(it => it != undefined));
  // @ts-ignore
  readonly applicationCleared$: Observable<Application> = this._selectedApplication$.asObservable()
    .pipe(filter(it => it == undefined));

  // @ts-ignore
  private readonly _selectedCallback$: BehaviorSubject<Callback|undefined> = new BehaviorSubject<Callback>(undefined);
  readonly selectedCallback$: Observable<Callback> = this._selectedCallback$.asObservable()
    .pipe(
  // @ts-ignore
      filter(it => it != undefined),
      distinctUntilChanged((x, y) => x.callbackId == y.callbackId),
    );
  // @ts-ignore
  readonly callbackCleared$: Observable<Callback> = this._selectedCallback$
    .asObservable()
    .pipe(filter(it => it == undefined));

  readonly _createdApplication$: Subject<Application> = new ReplaySubject<Application>();

  readonly _createdCallback$: Subject<Callback> = new ReplaySubject<Callback>();

  get currentApplication() {
    return this._selectedApplication$.value
  }

  get currentCallback() {
    return this._selectedCallback$.value
  }

  currentApplicationId?: string;
  currentCallbackId?: string;
  selectSubscription(value: Subscription) {
    this.currentApplicationId = value.application.id;
    this.currentCallbackId = value.callback.id;
  }

  applicationCreated(application: Application) {
    this._createdApplication$.next(application);
  }

  callbackCreated(callback: Callback) {
    this._createdCallback$.next(callback);
  }

  updateApplication(value?: Application) {
    this._selectedApplication$.next(value);
    this._selectedCallback$.next(undefined);
  }

  updateCallback(value?: Callback) {
    this._selectedCallback$.next(value);
  }

  clear() {
    this._selectedCallback$.next(undefined);
    this._selectedApplication$.next(undefined);
  }
}
