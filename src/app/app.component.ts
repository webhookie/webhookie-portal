import { Component } from '@angular/core';
import {NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth-config/auth-config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webhookie';

  constructor(private readonly oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(it => console.warn(it));
  }

  logout() {
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
