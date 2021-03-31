import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {WebhookieConfig} from "./model/webhookie-config";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContext {
  private readonly _config$: Subject<WebhookieConfig> = new ReplaySubject<WebhookieConfig>()

  init(conf: WebhookieConfig) {
    this._config$.next(conf);
  }

  config(): Observable<WebhookieConfig> {
    return this._config$
      .asObservable()
      .pipe(filter(it => it !== null));
  }
}
