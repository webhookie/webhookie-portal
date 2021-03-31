import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Application} from "./model/application";

@Injectable({
  providedIn: 'root'
})
export class WebhooksContext {
  // @ts-ignore
  private readonly _selectedApplication$: BehaviorSubject<Application> = new BehaviorSubject<Application>(null);

  update(application: Application) {
    this._selectedApplication$.next(application);
  }

  get currentApplication() {
    return this._selectedApplication$.value
  }

}
