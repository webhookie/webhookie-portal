// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  keycloak: {
    // issuer: "http://10.0.0.103:8000/auth/realms/webhookie",
    issuer: "https://webhookie.au.auth0.com/",
    redirectUri: "http://localhost:4200/",
    clientId: "nvKDmIK9Q5Zw1UKwpON8LE3tg9vZcXb4",
    // clientId: "webhookie-client",
    responseType: "code",
    scope: "openid profile email",
    requireHttps: false,
    showDebugInformation: true,
    disableAtHashCheck: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
