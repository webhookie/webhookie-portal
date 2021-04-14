import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Api} from "../../../shared/api";
import {SubscriptionTrafficFilter} from "./subscription-traffic-filter";
import {TableSort} from "../common/traffic-table/filter/table-sort";

@Injectable({
  providedIn: 'root'
})
export class SpanService {
  private SPAN_URI = "/traffic/span"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly adapter: SpanAdapter
  ) {
  }

  readSpans(filter: SubscriptionTrafficFilter, sort?: TableSort): Observable<Span[]> {
    let params = new HttpParams();
    Object.entries(filter)
      .filter(entry => entry[1] != "")
      .forEach(entry => {
        console.warn(entry);
        params = params.set(entry[0], entry[1]);
      })
    params = params.set("size", "20");
    params = params.set("page", "0");

    if(sort) {
      params = params.set("sort", `${sort.field.name},${sort.order}`);
    }
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' spans`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
