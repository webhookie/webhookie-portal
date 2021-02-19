import { Component } from '@angular/core';
import {NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {ConfigService} from "../../../shared/config.service";
import {AuthConfig} from "angular-oauth2-oidc/auth.config";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'webhookie-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  title = 'Webhookie';

  constructor(
    private readonly oauthService: OAuthService,
    private readonly configService: ConfigService
  ) {
    this.configService.config
      .subscribe(it => {
        let iamConfig = it.iam
        let authConfig: AuthConfig = {
          issuer: iamConfig.issuer,
          clientId: iamConfig.clientId,
          redirectUri: environment.iam.redirectUri,
          responseType: "code",
          scope: "openid profile email",
          requireHttps: environment.iam.requireHttps,
          showDebugInformation: environment.iam.showDebugInformation,
          disableAtHashCheck: environment.iam.disableAtHashCheck
        };
        console.info(`Setting up auth module for '${authConfig.issuer}', '${authConfig.clientId}'`)
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin()
          .then(it => console.info(`loadDiscoveryDocumentAndTryLogin result is: ${it}`));
      })
  }

  logout() {
    this.oauthService.revokeTokenAndLogout()
      .then();
    this.oauthService.logOut();
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if(!claims) {
      return null;
    }

    // @ts-ignore
    return claims['name'];
  }
}
