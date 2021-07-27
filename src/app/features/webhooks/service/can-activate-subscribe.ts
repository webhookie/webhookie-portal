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

import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {WebhooksContext} from "../webhooks-context";
import {RouterService} from "../../../shared/service/router.service";
import {LogService} from "../../../shared/service/log.service";
import {AuthService} from "../../../shared/service/auth.service";
import {Constants} from "../../../shared/constants";

@Injectable({
  providedIn: "root"
})
export class CanActivateSubscribe implements CanActivate {
  constructor(
    private readonly context: WebhooksContext,
    private readonly log: LogService,
    private readonly routeService: RouterService,
    private readonly router: Router,
    @Inject("Auth") private readonly authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.loggedIn) {
      this.log.debug("User is not logged in! redirecting to home");
      return this.router.createUrlTree([Constants.ROUTE_HOME]);
    }

    if(this.context.selectedTopic == undefined) {
      this.log.debug("topic is missing. redirecting to home")
      return this.router.createUrlTree([Constants.ROUTE_WELCOME]);
    }

    this.log.debug(`${route.url} can be activated`)
    return true;
  }
}
