export class Trace {
  constructor(
    public traceId: String,
    public topic: String,
    public statusUpdate: TraceStatusUpdate,
    public authorizedSubscribers: Array<String>,
  ) {
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
