import {Injectable} from "@angular/core";
import {BaseAdapter} from "./adapter";
import {IAMConfig, WebhookieConfig} from "../model/webhookie-config";

@Injectable({
  providedIn: 'root'
})
export class WebhookieConfigAdapter extends BaseAdapter<WebhookieConfig> {
  adapt(item: any): WebhookieConfig {
    let iam = new IAMConfig(
      item.iam.issuer,
      item.iam.clientId,
      item.iam.audience
    )
    return new WebhookieConfig(
      iam
    );
  }
}
