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

import {Component, ViewChild} from '@angular/core';
import {CallbackUrlComponent} from "./callback-url/callback-url.component";
import {ResponseComponent} from "../common/response/response.component";
import {
  CallbackService,
  CallbackValidationRequest
} from "../service/callback.service";
import {WebhooksContext} from "../webhooks-context";
import {BadRequestError} from "../../../shared/error/bad-request-error";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {WebhookBaseComponent} from "../common/webhook-base-component";
import {ValidateSubscriptionRequest} from "../../../shared/service/subscription.service";
import {ClientCredentialsOAuth2Details} from "../../../shared/model/callback/security/client-credentials-o-auth2-details";
import {HmacSecurityScheme} from "../../../shared/model/callback/security/hmac-security-scheme";
import {OAuthSecurityScheme} from "../../../shared/model/callback/security/o-auth-security-scheme";

@Component({
  selector: 'app-callback-test',
  templateUrl: './callback-test.component.html',
  styleUrls: ['./callback-test.component.css']
})
export class CallbackTestComponent extends WebhookBaseComponent {
  @ViewChild('callbackUrlComponent') callback?: CallbackUrlComponent
  @ViewChild('responseComponent') response!: ResponseComponent
  @ViewChild('requestExampleComponent') requestExampleComponent!: RequestExampleComponent

  subscribe: boolean = true;

  constructor(
    private readonly context: WebhooksContext,
    private readonly callbackService: CallbackService
  ) {
    super(context)
  }

  ngOnInit(): void {
  }

  get title() {
    return `Test ${this.webhook.topic.name} Webhook`
  }

  test() {
    this.response.init()

    let requestExample: ValidateSubscriptionRequest = this.requestExampleComponent.valueEx();
    let request: CallbackValidationRequest = {
      httpMethod: this.callback!.method,
      url: this.callback!.url,
      payload: JSON.stringify(requestExample.payload),
      headers: requestExample.headers
    }

    if(this.callback!.isHmac) {
      request.securityScheme = new HmacSecurityScheme(
        {
          secret: this.callback!.secret,
          keyId: this.callback!.keyId
        }
      )
    }

    if(this.callback!.isOAuth) {
      request.securityScheme = new OAuthSecurityScheme(
        new ClientCredentialsOAuth2Details(
          {
            tokenEndpoint: this.callback!.tokenEndpoint,
            clientId: this.callback!.clientId,
            secret: this.callback!.clientSecret,
            scopes: this.callback!.scopes
          }
        )
      )
    }

    this.callbackService.testCallback(request)
      .subscribe(
        it => this.response.update(it),
        (err: BadRequestError) => this.response.updateWithError(err.error)
      )
  }

  get isNotTestable(): boolean {
    return !this.callback?.isValidCallback;
  }
}
