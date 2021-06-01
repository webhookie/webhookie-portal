import {Inject, Injectable} from '@angular/core';
import {Api} from "../../../shared/api";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {Application} from "../../webhooks/model/application";
import {ApplicationAdapter} from "../../webhooks/service/adapter/application.adapter";
import {map} from "rxjs/operators";
import {Callback} from "../../../shared/model/callback";
import {CallbackAdapter} from "../../../shared/adapter/callback.adapter";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly applicationAdapter: ApplicationAdapter,
    private readonly callbackAdapter: CallbackAdapter
  ) {
  }

  myEntities(): Observable<Array<string>> {
    return this.api.json("/provider/entities")
  }

  entityApplications(entity: string): Observable<Array<Application>> {
    let params = new HttpParams().set("entity", entity);
    return this.api.json("/provider/applications", params)
      .pipe(map(it => this.applicationAdapter.adaptList(it)));
  }

  applicationCallbacks(applicationId: string): Observable<Array<Callback>> {
    let params = new HttpParams().set("applicationId", applicationId);
    return this.api.json("/provider/callbacks", params)
      .pipe(map(it => this.callbackAdapter.adaptList(it)));
  }
}
