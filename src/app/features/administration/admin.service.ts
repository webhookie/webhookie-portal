/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
  static ADMIN_URI = "/admin/"

  constructor(
    private readonly log: LogService,
    @Inject("Api") private readonly api: Api,
    private readonly accessGroupAdapter: AccessGroupAdapter,
    private readonly webhookieService: WebhookieService
  ) { }

  fetchProviderGroups(): Observable<Array<AccessGroup>> {
    return this.webhookieService.fetchAccessGroups(`${AdminService.ADMIN_URI}providergroups`)
  }

  fetchConsumerGroups(): Observable<Array<AccessGroup>> {
    return this.webhookieService.fetchAccessGroups(`${AdminService.ADMIN_URI}consumergroups`)
  }

  fetchAccessGroupsByType(type: string): Observable<Array<AccessGroup>> {
    if(type == "Consumer") {
      return this.fetchConsumerGroups()
    } else {
      return this.fetchProviderGroups()
    }
  }

  createAccessGroup(type: string, body: any): Observable<AccessGroup> {
    let uri = "consumergroups"
    if(type == "Provider") {
      uri = "providergroups"
    }
    return this.api.post(`${AdminService.ADMIN_URI}${uri}`, body, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(
        map((it: HttpResponse<any>) => this.accessGroupAdapter.adapt(it.body)),
      )
  }

  updateAccessGroup(type: string, body: any, id: string): Observable<AccessGroup> {
    let uri = "consumergroups"
    if(type == "Provider") {
      uri = "providergroups"
    }
    return this.api.put(`${AdminService.ADMIN_URI}${uri}/${id}`, body, new HttpParams(), new HttpHeaders(), HttpResponseType.JSON)
      .pipe(
        map((it: HttpResponse<any>) => this.accessGroupAdapter.adapt(it.body)),
      )
  }
}
