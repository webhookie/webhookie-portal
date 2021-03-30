import { Injectable } from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";

@Injectable({
  providedIn: 'root'
})
export class SpanService {
  private SPAN_URI = "/traffic/span"

  constructor(
    private readonly api: ApiService,
    private readonly log: LogService,
    private readonly adapter: SpanAdapter
  ) { }

  readSpans(): Observable<Span[]> {
    const params = new HttpParams();
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' spans`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
