import {Injectable} from '@angular/core';
import {BaseAdapter} from "./adapter";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserAdapter extends BaseAdapter<User> {
  adapt(item: any): User {
    return new User(
      item.entity,
      item.groups,
      item.roles,
      item.email
    );
  }
}
