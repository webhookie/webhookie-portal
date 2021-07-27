/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
