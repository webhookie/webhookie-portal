import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Constants} from "../constants";
import {LogService} from "../service/log.service";
import {RouterService} from "../service/router.service";
import {AuthService} from "../service/auth.service";
import {ApplicationContext} from "../application.context";
import {ArrayUtils} from "../array-utils";
import {map} from "rxjs/operators";

export abstract class RoleActivationGuard  implements CanActivate {
  abstract supportedRoles: Array<string>

  protected constructor(
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

    return this.appCtx.user$
      .pipe(
        map(it => ArrayUtils.intersect(this.supportedRoles, it.roles)),
        map(it => {
          if(it.length == 0) {
            this.log.debug("User is not Provider! redirecting to home");
            return this.router.createUrlTree([Constants.ROUTE_HOME]);
          }

          return true
        })
      )
  }
}
