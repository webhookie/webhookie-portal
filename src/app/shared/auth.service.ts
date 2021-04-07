import {Injectable} from '@angular/core';
import {NullValidationHandler, OAuthService, OAuthSuccessEvent} from "angular-oauth2-oidc";
import {AuthConfig} from "angular-oauth2-oidc/auth.config";
import {environment} from "../../environments/environment";
import {WebhookieConfig} from "./model/webhookie-config";
import {filter, map} from "rxjs/operators";
import {LogService} from "./log.service";
import {Constants} from "./constants";
import {RouterService} from "./router.service";
import {ApplicationContext} from "./application.context";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly oauthService: OAuthService,
    private readonly log: LogService,
    private readonly context: ApplicationContext,
    private readonly router: RouterService
  ) {
    this.notifyLogin()

    this.oauthService.events
      .pipe(filter(it => (it instanceof OAuthSuccessEvent) && it.type === Constants.AUTH_EVENT_TOKEN_REFRESHED))
      .subscribe(() => {
        this.notifyLogin()
        this.router.navigateToSaved()
      });

    this.context.config()
      .pipe(map(it => AuthService.toAuthConfig(it)))
      .subscribe(it => this.init(it));
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
      scope: "openid profile email",
      requireHttps: environment.iam.requireHttps,
      showDebugInformation: environment.iam.showDebugInformation,
      disableAtHashCheck: environment.iam.disableAtHashCheck
    };
  }

  notifyLogin() {
    if (this.loggedIn) {
      this.context.login(this.oauthService.getIdentityClaims());
    }
  }

  logout() {
    this.oauthService.revokeTokenAndLogout()
      .then();
    this.oauthService.logOut();
    this.router.navigateToHome();
    this.context.logout();
  }

  login() {
    this.router.saveCurrent();
    this.oauthService.initCodeFlow();
    this.oauthService.setupAutomaticSilentRefresh()
  }

  getToken() {
    return this.oauthService.getIdToken()
  }

  private init(config: AuthConfig) {
    this.log.info(`Setting up auth module for '${config.issuer}', '${config.clientId}'`)
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(it => this.log.info(`loadDiscoveryDocumentAndTryLogin result is: ${it}`));
  }
}
