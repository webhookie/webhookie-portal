import {AuthConfig} from "angular-oauth2-oidc/auth.config";
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: environment.iam.issuer,

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.iam.redirectUri,

  // The SPA's id.
  // The SPA is registerd with this id at the auth-serverß
  clientId: environment.iam.clientId,

  responseType: environment.iam.responseType,
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC.
  scope: environment.iam.scope,
  // Remove the requirement of using Https to simplify the demo
  // THIS SHOULD NOT BE USED IN PRODUCTION
  // USE A CERTIFICATE FOR YOUR IDP
  // IN PRODUCTION
  requireHttps: environment.iam.requireHttps,
  // at_hash is not present in JWT token
  showDebugInformation: environment.iam.showDebugInformation,
  disableAtHashCheck: environment.iam.disableAtHashCheck
};
