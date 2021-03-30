import {Injectable} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {TraceAdapter} from "./trace.adapter";

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private SPAN_URI = "/traffic/trace"

  constructor(
    private readonly api: ApiService,
    private readonly log: LogService,
    private readonly adapter: TraceAdapter
  ) {
  }

  readTraces(): Observable<any[]> {
    const params = new HttpParams();
    return this.api.json(this.SPAN_URI, params)
      .pipe(tap(it => this.log.info(`Fetched '${it.length}' traces`)))
      .pipe(map(list => {
        return list.map((it: any) => this.adapter.adapt(it))
      }))
  }
}
