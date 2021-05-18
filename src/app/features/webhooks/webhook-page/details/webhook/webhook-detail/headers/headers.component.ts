import {Component} from '@angular/core';
import {WebhooksContext} from "../../../../../webhooks-context";
import {WebhookBaseComponent} from "../../../../../common/webhook-base-component";
import {MessageHeader} from "../../../../../model/webhook";

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent extends WebhookBaseComponent {
  constructor(ctx: WebhooksContext) {
    super(ctx)
  }

  headerKeys(headerName: string): Array<string> {
    let header: MessageHeader = this.webhook.headers.filter(it => it.name == headerName)[0];
    let filteredNames = ["name", "properties", "x-parser-schema-id"]
    return Object.keys(header.properties)
      .filter(it => filteredNames.indexOf(it.toLowerCase()) == -1)
  }

  headerPropValue(headerName: string, prop: string): any {
    let header = this.webhook.headers.filter(it => it.name == headerName)[0];

    return header.properties[prop]
  }
}
