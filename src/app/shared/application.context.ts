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
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "./service/auth.service";
import {User} from "./model/user";
import {LogService} from "./service/log.service";
import {UserService} from "./service/user.service";
import {filter, map} from "rxjs/operators";
import {DropdownEntry} from "./model/dropdownEntry";
import {WebhookApi} from "../features/webhooks/model/webhook-api";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContext {
  readonly isLoggedIn$: Observable<boolean>;
  // @ts-ignore
  private readonly _user$: BehaviorSubject<User> = new BehaviorSubject<User>(User.UNKNOWN);
  readonly user$: Observable<User> = this._user$.asObservable();
  readonly loggedInUser$: Observable<User> = this.user$
    .pipe(filter(it => it != User.UNKNOWN));

  constructor(
    private readonly userService: UserService,
    @Inject("Auth") private readonly authService: AuthService,
    private readonly log: LogService
  ) {
    this.isLoggedIn$ = this.authService.loggedIn$;

    this.isLoggedIn$
      .pipe(filter(it => it))
      .subscribe(() => this.login(this.authService.claims))

    this.isLoggedIn$
      .pipe(filter(it => !it))
      .subscribe(() => this.logout());
  }

  get isAnonymous(): Observable<boolean> {
    return this.user$
      .pipe(map(it => it == User.UNKNOWN))
  }

  get isUser(): Observable<boolean> {
    return this.user$
      .pipe(map(it => it != User.UNKNOWN))
  }

  login(claims: any) {
    let name = claims['name']
    this.log.info(`${name} is logged in!`)
    this.log.debug(claims)
    this.userService.readUser()
      .subscribe(it => this._user$.next(it));
  }

  logout() {
    this._user$.next(User.UNKNOWN);
  }

  get userGroups(): Array<string> {
    return this._user$.value.groups;
  }

  get user(): User {
    return this._user$.value;
  }

  providerGroupFilter(): (entry: DropdownEntry) => boolean {
    return (it) => {
      return this.userGroups.indexOf(it.key) > -1;
    }
  }

  get isLoggedIn(): boolean {
    return this._user$.value != User.UNKNOWN
  }

  get hasProviderRole(): boolean {
    return this._user$.value.hasProviderRole();
  }

  get hasConsumerRole(): boolean {
    return this._user$.value.hasConsumerRole();
  }

  get hasAdminRole(): boolean {
    return this._user$.value.hasAdminRole();
  }

  hasProviderAccess(webhookApi: WebhookApi): boolean {
    return this.hasProviderRole
      && webhookApi.isAccessibleFor(this._user$.value)
  }
}
