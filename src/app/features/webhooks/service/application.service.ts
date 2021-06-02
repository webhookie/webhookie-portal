import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/service/log.service";
import {Observable} from "rxjs";
import {Application} from "../model/application";
import {map, tap} from "rxjs/operators";
import {ApplicationAdapter} from "./adapter/application.adapter";
import {Api} from "../../../shared/api";
import {HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {HttpResponseType} from "../../../shared/service/api.service";

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
      .pipe(
        tap(it => this.log.info(`Fetched '${it.length}' applications`)),
        map(it => this.adapter.adaptList(it))
      )
  }

  createApplication(request: CreateApplicationRequest): Observable<Application> {
    return this.api.post(this.REQUEST_URI, request, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(
        map((it: HttpResponse<any>) => this.adapter.adapt(it.body)),
      )
  }
}

export interface CreateApplicationRequest {
  name: string,
  consumerGroups: Array<string>
  description?: string
}
