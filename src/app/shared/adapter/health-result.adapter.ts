import { Injectable } from '@angular/core';
import {BaseAdapter} from "./adapter";
import {
  HealthComponent,
  HealthResult,
  HealthStatus, IAMHealthComponent,
  MongoDBHealthComponent,
  WebhookieHealthComponent
} from "../model/health-result";

@Injectable({
  providedIn: 'root'
})
export class HealthResultAdapter extends BaseAdapter<HealthResult>{
  adapt(item: any): HealthResult {
    let status: HealthStatus = item.status
    let components = Object.keys(item.components)
      .map(name => {
        let value = item.components[name]
        return HealthComponentFactory.create(name, value)
      })
    return new HealthResult(status, components);
  }
}

class HealthComponentFactory {
  static create(name: string, value: any): HealthComponent {
    if(name == MongoDBHealthComponent.NAME) {
      return new MongoDBHealthComponent(value)
    }

    if(name == WebhookieHealthComponent.NAME) {
      return new WebhookieHealthComponent(value)
    }

    if(name == IAMHealthComponent.NAME) {
      return new IAMHealthComponent(value)
    }

    return new HealthComponent(name, value.status, value.details)
  }
}
