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

import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {SSE} from 'sse.js';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private readonly authService: AuthService,
    private readonly log: LogService,
  ) { }

  sourceCache: {
    [key: string]: SSE
  } = {};

  createEventSource(uri: string, payload: any, types: Array<string>): Observable<any> {
    return new Observable<any>(observer => {
      this.close(uri)
      this.log.debug(`subscribing to events for ${uri}, ${payload}`);
      const source = new SSE(`${environment.apiUrl}/${uri}`, {
        headers: {
          "Authorization": `Bearer ${this.authService.getToken()}`,
          "Content-Type": "application/json"
        },
        payload: JSON.stringify(payload),
        method: "POST"
      });

      this.sourceCache[uri] = source

      types.forEach(type => {
        source.addEventListener(type, function(e) {
          let sse: ServerSentEvent<any> = {
            // @ts-ignore
            data: JSON.parse(e.data),
            type: e.type,
            // @ts-ignore
            id: e.id
          }
          observer.next(sse);
        })
      })

      source.addEventListener('Heartbeat', function(e) {
        let sse: ServerSentEvent<any> = {
          // @ts-ignore
          data: JSON.parse(e.data),
          type: e.type,
          // @ts-ignore
          id: e.id
        }
        console.debug(sse)
      })

      source.stream();
    });
  }

  close(uri: string) {
    let cacheElement = this.sourceCache[uri];
    if(cacheElement) {
      this.log.warn(`Closing event source to ${uri}`)
      cacheElement.close();
    }
  }
}

export interface ServerSentEvent<T> {
  data: T;
  type: string;
  id: string
}
