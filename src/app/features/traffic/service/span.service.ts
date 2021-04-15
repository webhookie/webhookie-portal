import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {SpanAdapter} from "./span.adapter";
import {Span} from "../model/span";
import {Api} from "../../../shared/api";
import {TableSort} from "../common/traffic-table/filter/table-sort";
import {TableFilter} from "../common/traffic-table/filter/table-filter";

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

  readSpans(filter: any, sort?: TableSort): Observable<Span[]> {
    let params = TableFilter.httpParams(filter, sort);
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' spans`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
