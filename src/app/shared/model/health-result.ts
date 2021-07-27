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
