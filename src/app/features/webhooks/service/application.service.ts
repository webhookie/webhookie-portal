import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {Application} from "../model/application";
import {map, tap} from "rxjs/operators";
import {ApplicationAdapter} from "./adapter/application.adapter";
import {Api} from "../../../shared/api";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly REQUEST_URI = "/applications"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: ApplicationAdapter
  ) {
  }

  public myApplications(): Observable<Array<Application>> {
    this.log.info("Fetching user's applications...");
    return this.api.json(this.REQUEST_URI)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' applications`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
