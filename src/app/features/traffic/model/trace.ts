import {ReplaySubject, Subject} from "rxjs";
import {TableMasterData} from "../../../shared/model/table/table-master-data";
import {TableDetailData} from "../../../shared/model/table/table-detail-data";
import {delay} from "rxjs/operators";

export class Trace extends TableMasterData {
  constructor(
    public traceId: string,
    public topic: string,
    public statusUpdate: TraceStatusUpdate,
    public authorizedSubscribers: Array<string>,
  ) {
    super();
    this.details.asObservable()
      .pipe(delay(500))
      .subscribe(() => this.loaded());
  }

  details: Subject<Array<TableDetailData>> = new ReplaySubject();

  get authorizedSubscribersString(): string {
    let length = this.authorizedSubscribers.length;
    if(length == 1) {
      return this.authorizedSubscribers[0];
    } else if(length > 1) {
      return this.authorizedSubscribers.reduce((value, current) => value + ", " + current)
    }

    return ""
  }

  get id(): string {
    return this.traceId;
  }
}

export class TraceStatusUpdate {
  constructor(
    public status: TraceStatus,
    public time: Date
  ) {
  }
}

// noinspection JSUnusedGlobalSymbols
export enum TraceStatus {
  PROCESSING = "PROCESSING",
  NO_SUBSCRIPTION = "NO_SUBSCRIPTION",
  ISSUES = "ISSUES",
  OK = "OK"
}
