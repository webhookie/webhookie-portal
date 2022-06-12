/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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
import {map, tap} from "rxjs/operators";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Api} from "../api";
import {LogService} from "./log.service";
import {HttpResponseType} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class TransformationService {
  private REQUEST_URI = "/transformation";

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
  ) {
  }
  transform(value: string, transformation: string): Observable<any> {
    this.log.info("Transforming message....")
    let httpParams = new HttpParams();
    let headers = new HttpHeaders()
      .set("Accept", ["application/json"]);
    let request = {
      value: JSON.parse(value),
      transformation: transformation
    }
    return this.api
      .post(`${this.REQUEST_URI}/transform`, request, httpParams, headers, HttpResponseType.JSON)
      .pipe(
        map(it => it.body),
        tap(_ => this.log.info("Message transformed successfully!"))
      )
  }
}
