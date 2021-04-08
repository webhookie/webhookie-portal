import {Inject, Injectable} from '@angular/core';
import {LogService} from "../../../shared/log.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {TraceAdapter} from "./trace.adapter";
import {Api} from "../../../shared/api";

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private SPAN_URI = "/traffic/trace"
  subscription_table:boolean=true;
  constructor(
    @Inject("Api") private readonly api: Api,
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
