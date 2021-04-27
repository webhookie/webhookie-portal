import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {User} from "./model/user";
import {LogService} from "./log.service";
import {UserService} from "./service/user.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContext {
  readonly isLoggedIn: Observable<boolean>;
  // @ts-ignore
  private readonly _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly log: LogService
  ) {
    this.isLoggedIn = this.authService.loggedIn$;

    this.isLoggedIn
      .subscribe(() => this.login(this.authService.claims))
  }

  login(claims: any) {
    let name = claims['name']
    this.log.info(`${name} is logged in!`)
    this.log.debug(claims)
    this.userService.readUser()
      .subscribe(it => this._user$.next(it));
  }
}
