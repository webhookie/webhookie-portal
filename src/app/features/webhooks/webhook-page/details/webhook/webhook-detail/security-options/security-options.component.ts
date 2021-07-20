import {Component, Input} from '@angular/core';
import {SecurityOption, WebhookApi} from "../../../../../model/webhook-api";

@Component({
  selector: 'app-security-options',
  templateUrl: './security-options.component.html',
  styleUrls: ['./security-options.component.css']
})
export class SecurityOptionsComponent {
  @Input() webhookApi!: WebhookApi

  securityKeys(name: string): Array<string> {
    let securityOption: SecurityOption = this.webhookApi.securityOptions.filter(it => it.name == name)[0];
    return Object.keys(securityOption.properties)
  }

  securityValue(item: SecurityOption, name: string): Array<string> {
    return item.properties[name]
  }
}

