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

import {Injectable} from '@angular/core';
import {OAuthService, OAuthSuccessEvent} from "angular-oauth2-oidc";
import {AuthConfig} from "angular-oauth2-oidc/auth.config";
import {filter, map} from "rxjs/operators";
import {LogService} from "./log.service";
import {RouterService} from "./router.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ApplicationConfiguration} from "../application-configuration";
import {Constants} from "../constants";
import {WebhookieConfig} from "../model/webhookie-config";
import {environment} from "../../../environments/environment";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _userClaims$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  readonly loggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(
    private readonly toastService: ToastService,
    private readonly oauthService: OAuthService,
    private readonly log: LogService,
    private readonly appConfiguration: ApplicationConfiguration,
    private readonly router: RouterService
  ) {
    this.notifyLogin()

    this.oauthService.events
      .pipe(filter(it => (it instanceof OAuthSuccessEvent) && it.type === Constants.AUTH_EVENT_TOKEN_REFRESHED))
      .subscribe(() => {
        this.notifyLogin()
        this.router.navigateToSaved()
      });

    this.appConfiguration.config()
      .pipe(map(it => AuthService.toAuthConfig(it)))
      .subscribe(it => this.init(it));
  }

  get claims(): any {
    return this._userClaims$.value;
  }

  get loggedIn(): boolean {
    return this.oauthService.hasValidAccessToken() || this.oauthService.hasValidIdToken()
  }

  // noinspection JSUnusedGlobalSymbols
  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }

    // @ts-ignore
    return claims['name'];
  }

  private static toAuthConfig(config: WebhookieConfig): AuthConfig {
    let iamConfig = config.iam
    return {
      issuer: iamConfig.issuer,
      clientId: iamConfig.clientId,
      redirectUri: environment.iam.redirectUri,
      responseType: "code",
      scope: "openid profile email offline_access",
      requireHttps: environment.iam.requireHttps,
      showDebugInformation: environment.iam.showDebugInformation,
      disableAtHashCheck: environment.iam.disableAtHashCheck,
      customQueryParams: {
        audience: iamConfig.audience
      },
    };
  }

  notifyLogin() {
    if (this.loggedIn) {
      this._isLoggedIn$.next(true);
      this._userClaims$.next(this.oauthService.getIdentityClaims());
    }
  }

  logout() {
    this.oauthService.revokeTokenAndLogout()
      .then();
    this.oauthService.logOut();
    this.router.navigateToHome();
    this._isLoggedIn$.next(false);
  }

  login() {
    this.router.saveCurrent();
    this.oauthService.initCodeFlow();
  }

  getToken() {
    return this.oauthService.getAccessToken()
  }

  private init(config: AuthConfig) {
    this.log.info(`Setting up auth module for '${config.issuer}', '${config.clientId}'`)
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(it => this.log.info(`loadDiscoveryDocumentAndTryLogin result is: ${it}`))
      .catch(it => {
        this.toastService.error(it, "Authentication Error!");
        this.logout();
      })
  }

  refreshToken() {
    this.log.info(`Refreshing token....'`)
    this.oauthService.refreshToken()
      .then(it => {
        this.log.info(`token has been refreshed`);
        this.log.info(it);
      })
  }
}
