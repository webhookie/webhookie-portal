import {TableDetailData} from "../../../shared/model/table/table-detail-data";
import {Callback} from "../../../shared/model/callback";
import {ApplicationDetails} from "../../../shared/model/subscription";

export class Span extends TableDetailData {
  constructor(
    public traceId: string,
    public spanId: string,
    public subscription: SubscriptionDetails,
    public responseCode: number,
    public responseBody: string,
    public statusUpdate: SpanStatusUpdate,
    public tries: number,
    public nextRetry?: SpanRetry
  ) {
    super();
  }

  get id(): string {
    return this.spanId;
  }

  get application(): string {
    return this.subscription.application.name
  }

  get entity(): string {
    return this.subscription.application.entity
  }

  get topic(): string {
    return this.subscription.topic
  }

  get callback(): Callback {
    return this.subscription.callback
  }

  isLoading: boolean = false;

  canBeRetried(): boolean {
    return [SpanStatus.OK, SpanStatus.NOT_OK].includes(this.statusUpdate.status)
  }

  subscriptionIsBlocked(): boolean {
    return this.statusUpdate.status == SpanStatus.BLOCKED;
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

export class SubscriptionDetails {
  constructor(
  public id: string,
  public application: ApplicationDetails,
  public topic: string,
  public callback: Callback,
  ) {
  }
}
