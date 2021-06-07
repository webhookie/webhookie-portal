// noinspection JSUnusedGlobalSymbols

import {BehaviorSubject, Observable} from "rxjs";

/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 7/6/21 14:42
 */

export class MockAuthService {
  private readonly _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly loggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  get claims(): any {
    return {}
  }

  get loggedIn(): boolean {
    return this._isLoggedIn$.value
  }

  logout() {
    this._isLoggedIn$.next(false);
  }

  login() {
    this._isLoggedIn$.next(true);
  }
}
