import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ApplicationContext} from "../application.context";
import {Constants} from "../constants";
import {AuthService} from "../service/auth.service";
import {LogService} from "../service/log.service";
import {RouterService} from "../service/router.service";

@Injectable({
  providedIn: 'root'
})
export class ProviderActivationGuard implements CanActivate {
  constructor(
    private readonly log: LogService,
    private readonly routeService: RouterService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly appCtx: ApplicationContext
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.authService.loggedIn) {
      this.log.debug("User is not logged in! redirecting to home");
      return this.router.createUrlTree([Constants.ROUTE_HOME]);
    }

    if(!this.appCtx.hasProviderRole) {
      this.log.debug("User is not Provider! redirecting to home");
      return this.router.createUrlTree([Constants.ROUTE_HOME]);
    }

    return true;
  }
}
