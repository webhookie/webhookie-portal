import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "./service/auth.service";
import {User} from "./model/user";
import {LogService} from "./service/log.service";
import {UserService} from "./service/user.service";
import {Constants} from "./constants";
import {filter} from "rxjs/operators";
import {ArrayUtils} from "./array-utils";
import {DropdownEntry} from "./model/dropdownEntry";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContext {
  readonly isLoggedIn: Observable<boolean>;
  // @ts-ignore
  private readonly _user$: BehaviorSubject<User> = new BehaviorSubject<User>(User.UNKNOWN);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly log: LogService
  ) {
    this.isLoggedIn = this.authService.loggedIn$;

    this.isLoggedIn
      .pipe(filter(it => it))
      .subscribe(() => this.login(this.authService.claims))
  }

  login(claims: any) {
    let name = claims['name']
    this.log.info(`${name} is logged in!`)
    this.log.debug(claims)
    this.userService.readUser()
      .subscribe(it => this._user$.next(it));
  }

  get userGroups(): Array<string> {
    return this._user$.value.groups;
  }

  get user(): User {
    return this._user$.value;
  }

  providerGroupFilter(): (entry: DropdownEntry) => boolean {
    return (it) => {
      return this.userGroups.indexOf(it.key) > -1;
    }
  }

  get hasProviderRole(): boolean {
    return this._user$.value.roles.includes(Constants.ROLE_WH_PROVIDER);
  }

  get hasConsumerRole(): boolean {
    return this._user$.value.roles.includes(Constants.ROLE_WH_CONSUMER);
  }

  get hasAdminRole(): boolean {
    return this._user$.value.roles.includes(Constants.ROLE_WH_ADMIN);
  }

  hasProviderAccess(groups: Array<string>): boolean {
    return this.hasProviderRole
      && ArrayUtils.intersect(this._user$.value.providerGroups, groups).length > 0
  }
}
