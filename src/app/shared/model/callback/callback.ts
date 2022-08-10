/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {SelectableItem} from "../../components/searchable-select/searchable-select.component";
import {TableDetailData} from "../table/table-detail-data";
import {SecuritySchemeType} from "./security/security-scheme-type";
import {CallbackSecurityScheme} from "./security/callback-security-scheme";
import {HmacSecurityScheme} from "./security/hmac-security-scheme";
import {OAuthSecurityScheme} from "./security/o-auth-security-scheme";
import {ApiKeySecurityScheme} from "./security/apikey-security-scheme";

export class Callback extends TableDetailData implements SelectableItem {
  constructor(
    public id: string,
    public name: string,
    public httpMethod: string,
    public url: string,
    public editStatus: CallbackEditStatus,
    public signable: boolean = false,
    public security: CallbackSecurityScheme | null
  ) {
    super();
  }

  get hmac(): HmacSecurityScheme | null {
    if(this.isHmac) {
      return this.security as HmacSecurityScheme
    }

    return null
  }

  get apikey(): ApiKeySecurityScheme | null {
    if(this.isApiKey) {
      return this.security as ApiKeySecurityScheme
    }

    return null
  }

  get oauth2(): OAuthSecurityScheme | null {
    if(this.isOAuth) {
      return this.security as OAuthSecurityScheme
    }

    return null
  }

  get isHmac(): Boolean {
    return this.security?.method == SecuritySchemeType.HMAC
  }

  get isApiKey(): Boolean {
    return this.security?.method == SecuritySchemeType.API_KEY
  }

  get isOAuth(): Boolean {
    return this.security?.method == SecuritySchemeType.OAUTH2
  }
}

export enum CallbackEditStatus {
  // noinspection JSUnusedGlobalSymbols
  LOCKED = "LOCKED",
  OPEN = "OPEN"
}
