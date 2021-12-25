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

import {Component, Input} from '@angular/core';
import {Callback} from "../../../../shared/model/callback/callback";
import {environment} from "../../../../../environments/environment";
import {HmacSecurityScheme} from "../../../../shared/model/callback/security/hmac-security-scheme";
import {OAuthSecurityScheme} from "../../../../shared/model/callback/security/o-auth-security-scheme";
import {Optional} from "../../../../shared/model/optional";

@Component({
  selector: 'app-callback-url',
  templateUrl: './callback-url.component.html',
  styleUrls: ['./callback-url.component.css']
})
//TODO: refactor!
export class CallbackUrlComponent {
  @Input() set callback(callback: Optional<Callback>) {
    if(callback) {
      this.name = callback.name
      this.url = callback.url
      this.method = callback.httpMethod
      if(callback.isHmac) {
        this.securityModel = CallbackUrlComponent.HMAC_SECURITY
        this.secret = CallbackUrlComponent.ENCODED_SECRET
        let scheme: HmacSecurityScheme = callback.security as HmacSecurityScheme
        this.keyId = scheme.details.keyId
      }

      if(callback.isOAuth) {
        this.securityModel = CallbackUrlComponent.OAUTH_SECURITY
        this.secret = CallbackUrlComponent.ENCODED_SECRET
        let scheme: OAuthSecurityScheme = callback.security as OAuthSecurityScheme
        this.tokenEndpoint = scheme.details.tokenEndpoint
        this.clientSecret = scheme.details.secret
        this.clientId = scheme.details.clientId
        this.scopes = scheme.details.scopes.join(",")
      }
    }
  }
  public static OAUTH_SECURITY = "OAuth 2.0"
  public static HMAC_SECURITY = "HMAC Signature"
  public static ENCODED_SECRET = "****"

  securityModels: any = [CallbackUrlComponent.OAUTH_SECURITY, CallbackUrlComponent.HMAC_SECURITY, 'None'];
  securityModel: any = "None"

  name: string = ""
  method: string = "POST"
  url: string = ""
  secret: string = ""
  keyId: string = ""
  tokenEndpoint: string = ""
  clientId: string = ""
  clientSecret: string = ""
  scopes: string = ""

  methods: Array<string> = [
    "POST", "PUT", "PATCH"
  ];

  notAvailable(mode: string): boolean {
    return !environment.enterprise && (mode == CallbackUrlComponent.OAUTH_SECURITY)
  }

  setMethod(method: string) {
    this.method = method
  }

  get isHmac() {
    return this.securityModel == CallbackUrlComponent.HMAC_SECURITY
  }

  get isOAuth() {
    return this.securityModel == CallbackUrlComponent.OAUTH_SECURITY
  }

  get isValidCallback(): boolean {
    // const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const regex = new RegExp("(https?://.*):?(\\d*)\\/?(.*)")
    return this.methods.includes(this.method) && regex.test(this.url)
  }
}
