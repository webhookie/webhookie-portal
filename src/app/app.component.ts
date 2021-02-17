import { Component } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webhookie';

  constructor(private readonly oauthService: OAuthService) {
  }

  logout() {
    this.oauthService.logOut();
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
      console.log(isLoggedIn)
      if (isLoggedIn) {
        this.oauthService.setupAutomaticSilentRefresh();
      } else {
        this.oauthService.initCodeFlow();
      }
    });
  }
}
