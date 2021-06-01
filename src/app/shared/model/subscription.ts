import {TableDetailData} from "./table/table-detail-data";
import {Callback} from "./callback";

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

  canBeValidated(): boolean {
    let validStatusList = [SubscriptionStatus.SAVED, SubscriptionStatus.BLOCKED, SubscriptionStatus.DEACTIVATED];
    return validStatusList
      .filter(it => it === this.statusUpdate.status)
      .length != 0
  }

  canBeActivated(): boolean {
    let validStatusList = [SubscriptionStatus.VALIDATED, SubscriptionStatus.DEACTIVATED];
    return validStatusList
      .filter(it => it === this.statusUpdate.status)
      .length != 0
  }
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
  SAVED = "SAVED",
  VALIDATED = "VALIDATED",
  ACTIVATED = "ACTIVATED",
  DEACTIVATED = "DEACTIVATED",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED"
}
