import {Injectable} from '@angular/core';
import {Adapter} from "./adapter";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {

  constructor() {
  }

  adapt(item: any): User {
    return new User(
      item.entity,
      item.groups,
      item.roles,
      item.email
    );
  }
}
