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

import {Inject, Injectable} from '@angular/core';
import {WebhookieConfigAdapter} from "../adapter/webhookie-config.adapter";
import {map, tap} from "rxjs/operators";
import {Api} from "../api";
import {ApplicationConfiguration} from "../application-configuration";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private CONFIG_URI: string = "/public/config"

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly config: ApplicationConfiguration,
    private readonly adapter: WebhookieConfigAdapter
  ) {
  }

  public read() {
    return this.api.json(this.CONFIG_URI)
      .pipe(map(it => this.adapter.adapt(it)))
      .pipe(tap(it => this.log.debug(it)))
      .subscribe(it => this.config.init(it))
  }
}
