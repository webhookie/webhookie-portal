import {Component, Input} from '@angular/core';
import {Callback} from "../../../../shared/model/callback";

@Component({
  selector: 'app-callback-url',
  templateUrl: './callback-url.component.html',
  styleUrls: ['./callback-url.component.css']
})
export class CallbackUrlComponent {
  @Input() set callback(callback: Callback | undefined) {
    if(callback) {
      this.name = callback.name
      this.url = callback.url
      this.method = callback.httpMethod
      if(callback.security) {
        this.securityModel = CallbackUrlComponent.HMAC_SECURITY
        this.secret = CallbackUrlComponent.ENCODED_SECRET
        this.keyId = callback.security.keyId
      }
    }
  }
  public static HMAC_SECURITY = "HMAC Signature"
  public static ENCODED_SECRET = "****"

  securityModels: any = [CallbackUrlComponent.HMAC_SECURITY, 'None'];
  securityModel: any = "None"

  name: string = ""
  method: string = "POST"
  url: string = ""
  secret: string = ""
  keyId: string = ""

  methods: Array<string> = [
    "POST", "PUT", "PATCH"
  ];

  setMethod(method: string) {
    this.method = method
  }

  get isHmac() {
    return this.securityModel == CallbackUrlComponent.HMAC_SECURITY
  }
}
