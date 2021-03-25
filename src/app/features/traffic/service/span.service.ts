import { Injectable } from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpanService {
  private SPAN_URI = "/traffic/span"

  constructor(
    private readonly api: ApiService,
    private readonly log: LogService,
  ) { }

  readSpans(): Observable<any[]> {
    const params = new HttpParams()
      .set("status", "OK");
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' spans`)))
      .pipe(map(list => {
        return list.map((it: any) => {
          this.log.warn(it);
          return it
          //this.adapter.adapt(it)
        })
      }))
  }
}
