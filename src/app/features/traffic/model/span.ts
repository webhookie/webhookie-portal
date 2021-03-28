export class Span {
  constructor(
    public traceId: string,
    public spanId: string,
    public application: string,
    public entity: string,
    public topic: string,
    public callbackUrl: string,
    public responseCode: number,
    public responseBody: string,
    public statusUpdate: SpanStatusUpdate,
    public tries: number,
    public nextRetry?: SpanRetry
) {
  }
}

export class SpanStatusUpdate {
  constructor(
    public status: SpanStatus,
    public time: Date
  ) {
  }
}

export enum SpanStatus {
  PROCESSING = "PROCESSING",
  RETRYING = "RETRYING",
  BLOCKED = "BLOCKED",
  NOT_OK = "NOT_OK",
  OK = "OK"
}

export class SpanRetry {
  constructor(
    public time: Date,
    public no: number,
    public statusCode?: number
  ) {
  }
}