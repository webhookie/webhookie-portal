import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "./service/auth.service";
import {User} from "./model/user";
import {LogService} from "./service/log.service";
import {UserService} from "./service/user.service";
import {filter, map} from "rxjs/operators";
import {ArrayUtils} from "./array-utils";
import {DropdownEntry} from "./model/dropdownEntry";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContext {
  readonly isLoggedIn: Observable<boolean>;
  // @ts-ignore
  private readonly _user$: BehaviorSubject<User> = new BehaviorSubject<User>(User.UNKNOWN);
  readonly user$: Observable<User> = this._user$.asObservable();
  readonly loggedInUser$: Observable<User> = this.user$
    .pipe(filter(it => it != User.UNKNOWN));

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly log: LogService
  ) {
    this.isLoggedIn = this.authService.loggedIn$;

    this.isLoggedIn
      .pipe(filter(it => it))
      .subscribe(() => this.login(this.authService.claims))

    this.isLoggedIn
      .pipe(filter(it => !it))
      .subscribe(() => this.logout());
  }

  get isAnonymous(): Observable<boolean> {
    return this.user$
      .pipe(map(it => it == User.UNKNOWN))
  }

  get isUser(): Observable<boolean> {
    return this.user$
      .pipe(map(it => it != User.UNKNOWN))
  }

  login(claims: any) {
    let name = claims['name']
    this.log.info(`${name} is logged in!`)
    this.log.debug(claims)
    this.userService.readUser()
      .subscribe(it => this._user$.next(it));
  }

  logout() {
    this._user$.next(User.UNKNOWN);
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
    return this._user$.value.hasProviderRole();
  }

  get hasConsumerRole(): boolean {
    return this._user$.value.hasConsumerRole();
  }

  get hasAdminRole(): boolean {
    return this._user$.value.hasAdminRole();
  }

  hasProviderAccess(groups: Array<string>): boolean {
    return this.hasProviderRole
      && ArrayUtils.intersect(this._user$.value.providerGroups, groups).length > 0
  }
}
