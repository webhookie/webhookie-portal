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
import {Callback, CallbackEditStatus} from "../model/callback/callback";
import {CallbackSecuritySchemeAdapter} from "./callback-security-scheme.adapter";

@Injectable({
  providedIn: 'root'
})
export class CallbackAdapter extends BaseAdapter<Callback> {
  constructor(
    public securityAdapter: CallbackSecuritySchemeAdapter
  ) {
    super();
  }

  adapt(item: any): Callback {
    let security = this.securityAdapter.adapt(item.securityScheme);
    let editStatus = item.editStatus as CallbackEditStatus;
    return new Callback(item.id, item.name, item.httpMethod, item.url, editStatus, item.signable, security);
  }
}
