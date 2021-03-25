export class Subscription {
  constructor(
    public id: string,
    public application: Application,
    public callback: CallbackDetails,
    public statusUpdate: StatusUpdate,
    public topic: string,
    public blocked: boolean
  ) {
  }
}

export class Application {
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

export class CallbackSecurity {
  constructor(
    public method: string,
    public keyId: string
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
