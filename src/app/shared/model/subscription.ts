/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {TableDetailData} from "./table/table-detail-data";
import {Callback} from "./callback/callback";

export class Subscription extends TableDetailData {
  constructor(
    public id: string,
    public application: ApplicationDetails,
    public callback: Callback,
    public statusUpdate: StatusUpdate,
    public topic: string,
    public blocked: boolean
  ) {
    super();
  }

  isLoading: boolean = false;
}

export class ApplicationDetails {
  constructor(
    public id: string,
    public name: string,
    public entity: string
  ) {
  }
}

export class StatusUpdate {
  // noinspection JSUnusedGlobalSymbols
  constructor(
    public status: SubscriptionStatus,
    public reason: string | null,
    public time: Date
  ) {
  }
}

export enum SubscriptionStatus {
  DRAFT = "DRAFT",
  VALIDATED = "VALIDATED",
  READY_TO_SUBMIT = "READY TO SUBMIT",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ACTIVATED = "ACTIVATED",
  DEACTIVATED = "DEACTIVATED",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
  UNSUSPENDED = "UNSUSPENDED",
}
