import {Component} from '@angular/core';
import {WebhookBaseComponent} from "../../../../../common/webhook-base-component";
import {WebhooksContext} from "../../../../../webhooks-context";
import {SecurityOption} from "../../../../../model/webhook-group";

@Component({
  selector: 'app-security-options',
  templateUrl: './security-options.component.html',
  styleUrls: ['./security-options.component.css']
})
export class SecurityOptionsComponent extends WebhookBaseComponent {
  securityKeys(name: string): Array<string> {
    let securityOption: SecurityOption = this.webhookGroup.securityOptions.filter(it => it.name == name)[0];
    return Object.keys(securityOption.properties)
  }

  securityValue(item: SecurityOption, name: string): Array<string> {
    return item.properties[name]
  }

  constructor(ctx: WebhooksContext) {
    super(ctx)
  }
}

