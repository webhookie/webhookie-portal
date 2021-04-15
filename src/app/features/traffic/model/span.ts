import {TrafficDetailData} from "../common/traffic-detail-data";
import {Callback} from "../../../shared/model/callback";

export class Span implements TrafficDetailData{
  constructor(
    public traceId: string,
    public spanId: string,
    public application: string,
    public entity: string,
    public topic: string,
    public callback: Callback,
    public responseCode: number,
    public responseBody: string,
    public statusUpdate: SpanStatusUpdate,
    public tries: number,
    public nextRetry?: SpanRetry
  ) {
  }

  get id(): string {
    return this.spanId;
  }

  get isLoading(): boolean {
    return false;
  }
}

export class SpanStatusUpdate {
  constructor(
    public status: SpanStatus,
    public time: Date
  ) {
  }
}

// noinspection JSUnusedGlobalSymbols
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
