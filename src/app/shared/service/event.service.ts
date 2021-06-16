import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {SSE} from 'sse.js';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private readonly authService: AuthService) { }

  sourceCache: {
    [key: string]: SSE
  } = {};

  createEventSource(uri: string, payload: any, types: Array<string>): Observable<any> {
    return new Observable<any>(observer => {
      let cacheElement = this.sourceCache[uri];
      if(cacheElement) {
        console.warn(`Closing event source to ${uri}`)
        cacheElement.close();
      }

      console.info(`subscribing to events for ${uri}, ${payload}`);
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
/*
      source.onmessage = event => {
        console.warn(event);
        observer.next(event);
      };
*/

      source.stream();
    });
  }

}

export interface ServerSentEvent<T> {
  data: T;
  type: string;
  id: string
}
