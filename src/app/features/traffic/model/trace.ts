export class Trace {
  constructor(
    public traceId: string,
    public topic: string,
    public statusUpdate: TraceStatusUpdate,
    public authorizedSubscribers: Array<string>,
  ) {
  }

  get authorizedSubscribersString(): string {
    let length = this.authorizedSubscribers.length;
    if(length == 1) {
      return this.authorizedSubscribers[0];
    } else if(length > 1) {
      return this.authorizedSubscribers.reduce((value, current) => value + ", " + current)
    }

    return ""
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
