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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _userClaims$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  readonly loggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(
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
      .then(it => this.log.info(`loadDiscoveryDocumentAndTryLogin result is: ${it}`));
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
