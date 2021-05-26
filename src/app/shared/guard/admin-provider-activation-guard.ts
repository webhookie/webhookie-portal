import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationContext} from "../application.context";
import {Constants} from "../constants";
import {AuthService} from "../service/auth.service";
import {LogService} from "../service/log.service";
import {RouterService} from "../service/router.service";
import {RoleActivationGuard} from "./role-activation-guard";

@Injectable({
  providedIn: 'root'
})
export class AdminOrProviderActivationGuard extends RoleActivationGuard {
  constructor(
    log: LogService,
    routeService: RouterService,
    router: Router,
    authService: AuthService,
    appCtx: ApplicationContext
  ) {
    super(log, routeService, router, authService, appCtx);
  }

  supportedRoles: Array<string> = [Constants.ROLE_WH_ADMIN, Constants.ROLE_WH_PROVIDER];
}
