import {Inject, Injectable} from '@angular/core';
import {LogService} from "./log.service";
import {AccessGroupAdapter} from "../adapter/access-group-adapter.service";
import {Observable} from "rxjs";
import {AccessGroup} from "../model/access-group";
import {Api} from "../api";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebhookieService {

  constructor(
    private readonly log: LogService,
    @Inject("Api") private readonly api: Api,
    private readonly consumerGroupAdapter: AccessGroupAdapter
  ) {
  }

  fetchConsumerGroups(): Observable<Array<AccessGroup>> {
    return this.fetchAccessGroups("consumergroups")
  }

  fetchAccessGroups(uri: string): Observable<Array<AccessGroup>> {
    return this.api.json(`/admin/${uri}`)
      .pipe(map(it => this.consumerGroupAdapter.adaptList(it)))
  }
}
