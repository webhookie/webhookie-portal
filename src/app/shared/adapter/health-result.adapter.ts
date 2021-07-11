import { Injectable } from '@angular/core';
import {BaseAdapter} from "./adapter";
import {HealthComponent, HealthResult, HealthStatus} from "../model/health-result";

@Injectable({
  providedIn: 'root'
})
export class HealthResultAdapter extends BaseAdapter<HealthResult>{
  adapt(item: any): HealthResult {
    let status: HealthStatus = item.status
    let components = Object.keys(item.components)
      .map(name => {
        let value = item.components[name]
        return new HealthComponent(name, value.status, value.details)
      })
    return new HealthResult(status, components);
  }
}
