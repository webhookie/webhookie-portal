import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {WebhooksContext} from "../webhooks-context";
import {RouterService} from "../../../shared/router.service";
import {LogService} from "../../../shared/log.service";
import {AuthService} from "../../../shared/auth.service";
import {Constants} from "../../../shared/constants";

@Injectable({
  providedIn: "root"
})
export class CanActivateSubscribe implements CanActivate {
  constructor(
    private readonly context: WebhooksContext,
    private readonly log: LogService,
    private readonly routeService: RouterService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.loggedIn) {
      this.log.debug("User is not logged in! redirecting to home");
      return this.router.createUrlTree([Constants.ROUTE_HOME]);
    }

    if(this.context.selectedTopic == null) {
      this.log.debug("topic is missing. redirecting to home")
      return this.router.createUrlTree([Constants.ROUTE_HOME]);
    }

    this.log.debug(`${route.url} can be activated`)
    return true;
  }
}
