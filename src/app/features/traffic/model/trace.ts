export class Trace {
  constructor(
    public traceId: String,
    public topic: String,
    public statusUpdate: TraceStatusUpdate,
    public authorizedSubscribers: Array<String>,
  ) {
  }

  get authorizedSubscribersString() {
    if(this.authorizedSubscribers.length > 1) {
      return this.authorizedSubscribers.reduce((value, current) => value + ", " + current)
    }

    return this.authorizedSubscribers
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
