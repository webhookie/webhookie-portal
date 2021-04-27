import {CallbackSecurity} from "./callback-security";
import {TableDetailData} from "./table/table-detail-data";

export class Subscription extends TableDetailData {
  constructor(
    public id: string,
    public application: ApplicationDetails,
    public callback: CallbackDetails,
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

export class CallbackDetails {
  // noinspection JSUnusedGlobalSymbols
  constructor(
    public id: string,
    public name: string,
    public httpMethod: string,
    public url: string,
    public signable: boolean,
    public security: CallbackSecurity | null
  ) {
  }
}


// noinspection JSUnusedGlobalSymbols
export enum SubscriptionStatus {
  SAVED = "SAVED",
  VALIDATED = "VALIDATED",
  ACTIVATED = "ACTIVATED",
  DEACTIVATED = "DEACTIVATED",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED"
}
