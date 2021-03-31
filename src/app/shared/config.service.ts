import {Inject, Injectable} from '@angular/core';
import {WebhookieConfigAdapter} from "./adapter/webhookie-config.adapter";
import {map, tap} from "rxjs/operators";
import {LogService} from "./log.service";
import {Api} from "./api";
import {ApplicationContext} from "./application.context";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private CONFIG_URI: string = "/public/config"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly context: ApplicationContext,
    private readonly adapter: WebhookieConfigAdapter
  ) {
  }

  public read() {
    return this.api.json(this.CONFIG_URI)
      .pipe(map(it => this.adapter.adapt(it)))
      .pipe(tap(it => this.log.debug(it)))
      .subscribe(it => this.context.init(it))
  }
}
