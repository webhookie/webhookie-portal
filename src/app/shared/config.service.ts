import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {WebhookieConfig} from "./model/webhookie-config";
import {WebhookieConfigAdapter} from "./adapter/webhookie-config.adapter";
import {filter, map, tap} from "rxjs/operators";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private CONFIG_URI: string = "/public/config"

  private readonly _config$: Subject<WebhookieConfig> = new ReplaySubject<WebhookieConfig>()
  public readonly config: Observable<WebhookieConfig> = this._config$
    .asObservable()
    .pipe(filter(it => it !== null))

  constructor(
    private readonly api: ApiService,
    private readonly log: LogService,
    private readonly adapter: WebhookieConfigAdapter
  ) {
  }

  public read() {
    return this.api.json(this.CONFIG_URI)
      .pipe(map(it => this.adapter.adapt(it)))
      .pipe(tap(it => this.log.debug(it)))
      .subscribe(it => this._config$.next(it))
  }
}
