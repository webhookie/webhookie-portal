import {Injectable} from '@angular/core';
import {BaseAdapter} from "./adapter";
import {Callback} from "../model/callback";
import {CallbackSecurity} from "../model/callback-security";

@Injectable({
  providedIn: 'root'
})
export class CallbackAdapter extends BaseAdapter<Callback> {
  adapt(item: any): Callback {
    let signable: boolean = item.signable

    let itemSecurity = item.security
    let security = (itemSecurity != null) ? new CallbackSecurity(itemSecurity.method, itemSecurity.keyId) : null

    return new Callback(item.id, item.name, item.httpMethod, item.url, signable, security);
  }
}
