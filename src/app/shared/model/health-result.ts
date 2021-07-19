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
    let reason = this.details["reason"];
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
