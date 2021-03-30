import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {IAMConfig, WebhookieConfig} from "../model/webhookie-config";

@Injectable({
  providedIn: 'root'
})
export class WebhookieConfigAdapter implements Adapter<WebhookieConfig> {
  adapt(item: any): WebhookieConfig {
    let iam = new IAMConfig(
      item.iam.issuer,
      item.iam.clientId
    )
    return new WebhookieConfig(
      iam
    );
  }
}
