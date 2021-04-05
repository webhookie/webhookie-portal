import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {WebhookieConfig} from "./model/webhookie-config";
import {filter} from "rxjs/operators";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContext {
  private readonly _config$: Subject<WebhookieConfig> = new ReplaySubject<WebhookieConfig>()
  private readonly _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(
    private readonly log: LogService
  ) {
  }

  init(conf: WebhookieConfig) {
    this._config$.next(conf);
  }

  config(): Observable<WebhookieConfig> {
    return this._config$
      .asObservable()
      .pipe(filter(it => it !== null));
  }

  login(claims: any) {
    let name = claims['name']
    this.log.info(`${name} is logged in!`)
    this.log.debug(claims)
    this._isLoggedIn$.next(true)
  }

  logout() {
    this.log.info(`logging out!`)
    this._isLoggedIn$.next(false)
  }
}
