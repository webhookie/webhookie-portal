import { Injectable } from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {

  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  get decodedAccessToken() { return this._decodedAccessToken; }
  get decodedIDToken() { return this._decodedIDToken; }

  constructor(
    private readonly oauthService: OAuthService,
    private readonly authConfig: AuthConfig
  ) {}

  async initAuth(): Promise<any> {
    console.warn(1);
    return new Promise<void>((resolveFn, rejectFn) => {
    console.warn(2);
      // setup oauthService
      this.oauthService.configure(this.authConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new NullValidationHandler();
    console.warn(3);

      // subscribe to token events
      this.oauthService.events
        .pipe(filter((e: any) => {
          console.warn(e);
          return e.type === 'token_received';
        }))
        .subscribe(() => this.handleNewToken());

      // continue initializing app or redirect to login-page

      console.warn(4);
      this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
        console.warn(5);
        console.warn(isLoggedIn);
        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
          resolveFn();
        } else {
          this.oauthService.initImplicitFlow();
          rejectFn();
        }
      });

    });
  }

  private handleNewToken() {
    console.warn(51);

    this._decodedAccessToken = this.oauthService.getAccessToken();
    this._decodedIDToken = this.oauthService.getIdToken();
  }

}
