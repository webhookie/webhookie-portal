export class HealthResult {
  constructor(
    public status: HealthStatus,
    public components: Array<HealthComponent>
  ) {
  }

  static down(): HealthResult {
    return new HealthResult(HealthStatus.DOWN, [
      new HealthComponent("Service", HealthStatus.DOWN, {message: "webhookie backend is either starting up or not available"})
    ])
  }

  get isUp(): boolean {
    return this.status == HealthStatus.UP
  }

  reason(): string {
    if(this.isUp) {
      return ""
    }

    return this.components
      .filter(it => (it.isDown) && it.hasReason )
      .map(it => it.reason!)
      .reduce((value, current) => value + ", " + current)
  }
}

export enum HealthStatus {
  UP = "UP",
  DOWN = "DOWN"
}

export class HealthComponent {
  constructor(
    public name: string,
    public status: HealthStatus,
    public details: any
  ) {
  }

  get isDown(): boolean {
    return this.status == HealthStatus.DOWN
  }

  get hasReason(): boolean {
    return this.reason != null
  }

  get reason(): string | null {
    let reason = this.details["error"];
    if(reason) {
      return reason
    }
    let message = this.details["message"];
    if(message) {
      return message
    }

    return null
  }
}

export class MongoDBHealthComponent extends HealthComponent {
  static NAME = "mongo"

  constructor(value: any) {
    super(MongoDBHealthComponent.NAME, value.status, value.details);
  }

  get reason(): string {
    if(this.isDown) {
      return "MongoDB instance is either starting up or not available"
    }

    return ""
  }
}

export class WebhookieHealthComponent extends HealthComponent {
  static NAME = "webhookie"

  constructor(value: any) {
    super(WebhookieHealthComponent.NAME, value.status, value.details);
  }

  get reason(): string {
    if(this.isDown) {
      return "webhookie backend is either starting up or not available"
    }

    return ""
  }
}

export class IAMHealthComponent extends HealthComponent {
  static NAME = "IAM"

  constructor(value: any) {
    super(IAMHealthComponent.NAME, value.status, value.details);
  }

  get reason(): string {
    if(this.isDown) {
      return this.details["error"]
    }

    return ""
  }
}
