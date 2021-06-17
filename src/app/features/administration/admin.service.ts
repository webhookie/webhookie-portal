import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AccessGroup} from "../../shared/model/access-group";
import {WebhookieService} from "../../shared/service/webhookie.service";
import {LogService} from "../../shared/service/log.service";
import {Api} from "../../shared/api";
import {AccessGroupAdapter} from "../../shared/adapter/access-group-adapter.service";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {HttpResponseType} from "../../shared/service/api.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly log: LogService,
    @Inject("Api") private readonly api: Api,
    private readonly accessGroupAdapter: AccessGroupAdapter,
    private readonly webhookieService: WebhookieService
  ) { }

  fetchProviderGroups(): Observable<Array<AccessGroup>> {
    return this.webhookieService.fetchAccessGroups("providergroups")
  }

  fetchAccessGroupsByType(type: string): Observable<Array<AccessGroup>> {
    if(type == "Consumer") {
      return this.webhookieService.fetchConsumerGroups()
    } else {
      return this.fetchProviderGroups()
    }
  }

  createAccessGroup(type: string, body: any): Observable<AccessGroup> {
    let uri = "consumergroups"
    if(type == "Provider") {
      uri = "providergroups"
    }
    return this.api.post(`/admin/${uri}`, body, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(
        map((it: HttpResponse<any>) => this.accessGroupAdapter.adapt(it.body)),
      )
  }

  updateAccessGroup(type: string, body: any, id: string): Observable<AccessGroup> {
    let uri = "consumergroups"
    if(type == "Provider") {
      uri = "providergroups"
    }
    return this.api.put(`/admin/${uri}/${id}`, body, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(
        map((it: HttpResponse<any>) => this.accessGroupAdapter.adapt(it.body)),
      )
  }
}
