import {Inject, Injectable} from '@angular/core';
import {Api} from "../api";
import {LogService} from "../log.service";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {UserAdapter} from "../adapter/user.adapter";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly userAdapter: UserAdapter,
    private readonly log: LogService
  ) { }

  readUser(): Observable<User> {
    this.log.info("Reading user info...")
    return this.api.json("/user")
      .pipe(
        tap(it => this.log.debug(it)),
        map(it => this.userAdapter.adapt(it))
      )
  }
}
