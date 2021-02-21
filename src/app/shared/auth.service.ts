import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {AuthConfig} from "angular-oauth2-oidc/auth.config";
import {environment} from "../../environments/environment";
import {WebhookieConfig} from "./model/webhookie-config";
import {map} from "rxjs/operators";
import {LogService} from "./log.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly oauthService: OAuthService,
    private readonly log: LogService,
    private readonly configService: ConfigService
  ) {
    this.oauthService.events
      .subscribe(it => this.log.warn(it));

    this.configService.config
      .pipe(map(it => AuthService.toAuthConfig(it)))
      .subscribe(it => this.init(it));
  }

  logout() {
    this.oauthService.revokeTokenAndLogout()
      .then();
    this.oauthService.logOut();
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  get loggedIn() {
    return this.oauthService.hasValidAccessToken() || this.oauthService.hasValidIdToken()
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if(!claims) {
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

  private init(config: AuthConfig) {
    this.log.info(`Setting up auth module for '${config.issuer}', '${config.clientId}'`)
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(it => this.log.info(`loadDiscoveryDocumentAndTryLogin result is: ${it}`));
  }

  getToken() {
    return this.oauthService.getIdToken()
  }
}
