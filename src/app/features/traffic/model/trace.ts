import {ReplaySubject, Subject} from "rxjs";
import {TrafficMasterData} from "../common/traffic-master-data";
import {TrafficDetailData} from "../common/traffic-detail-data";
import {delay} from "rxjs/operators";

export class Trace extends TrafficMasterData {
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

  details: Subject<Array<TrafficDetailData>> = new ReplaySubject();

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

export enum TraceStatus {
  PROCESSING = "PROCESSING",
  NO_SUBSCRIPTION = "NO_SUBSCRIPTION",
  ISSUES = "ISSUES",
  OK = "OK"
}
