import {CallbackSecurity} from "../../shared/model/callback-security";

export class Subscription {
  constructor(
    public id: string,
    public application: ApplicationDetails,
    public callback: CallbackDetails,
    public statusUpdate: StatusUpdate,
    public topic: string,
    public blocked: boolean
  ) {
  }

  canBeValidated(): boolean {
    let validStatusList = [SubscriptionStatus.SAVED, SubscriptionStatus.BLOCKED, SubscriptionStatus.DEACTIVATED];
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
  constructor(
  public status: SubscriptionStatus,
  public reason: string | null,
  public time: Date
) {
  }
}

export class CallbackDetails {
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


enum SubscriptionStatus {
  SAVED = "SAVED",
  VALIDATED = "VALIDATED",
  ACTIVATED = "ACTIVATED",
  DEACTIVATED = "DEACTIVATED",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED"
}
