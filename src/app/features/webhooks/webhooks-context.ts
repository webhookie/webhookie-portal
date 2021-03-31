import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Application} from "./model/application";
import {filter} from "rxjs/operators";
import {Callback} from "./model/callback";

@Injectable({
  providedIn: 'root'
})
export class WebhooksContext {
  // @ts-ignore
  private readonly _selectedApplication$: BehaviorSubject<Application> = new BehaviorSubject<Application>(null);
  readonly selectedApplication$: Observable<any> = this._selectedApplication$.asObservable()
    .pipe(
      filter(it => it != null)
    );

  updateApplication(value: Application) {
    this._selectedApplication$.next(value);
  }

  get currentApplication() {
    return this._selectedApplication$.value
  }

  // @ts-ignore
  private readonly _selectedCallback$: BehaviorSubject<Callback> = new BehaviorSubject<Callback>(null);
  readonly selectedCallback$: Observable<any> = this._selectedCallback$.asObservable()
    .pipe(
      filter(it => it != null)
    );

  updateCallback(value: Callback) {
    this._selectedCallback$.next(value);
  }

  get currentCallback() {
    return this._selectedCallback$.value
  }
}
