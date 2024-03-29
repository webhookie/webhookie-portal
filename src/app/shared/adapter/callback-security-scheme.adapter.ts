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

import {Injectable} from '@angular/core';
import {BaseAdapter} from "./adapter";
import {SecuritySchemeType} from "../model/callback/security/security-scheme-type";
import {CallbackSecurityScheme} from "../model/callback/security/callback-security-scheme";
import {HmacSecurityScheme} from "../model/callback/security/hmac-security-scheme";
import {OAuthSecurityScheme} from "../model/callback/security/o-auth-security-scheme";
import {ApiKeySecurityScheme} from "../model/callback/security/apikey-security-scheme";

@Injectable({
  providedIn: 'root'
})
export class CallbackSecuritySchemeAdapter extends BaseAdapter<CallbackSecurityScheme|null> {
  adapt(item: any): CallbackSecurityScheme | null {
    if(item != null) {
      if(item.method == SecuritySchemeType.HMAC) {
        return new HmacSecurityScheme(item.details)
      } else if(item.method == SecuritySchemeType.API_KEY) {
        return new ApiKeySecurityScheme(item.details)
      } else if(item.method == SecuritySchemeType.OAUTH2) {
        return new OAuthSecurityScheme(item.details);
      }
    }

    return null;
  }
}
