import {Injectable} from '@angular/core';
import {Adapter} from "../../../../shared/adapter/adapter";
import {Callback} from "../../model/callback";
import {CallbackSecurity} from "../../../../shared/model/callback-security";

@Injectable({
  providedIn: 'root'
})
export class CallbackAdapter implements Adapter<Callback> {

  constructor() {
  }

  adapt(item: any): Callback {
    let signable: boolean = item.signable

    let itemSecurity = item.security
    let security

    if(itemSecurity != null) {
      security = new CallbackSecurity(itemSecurity.method, itemSecurity.keyId)
    }

    return new Callback(item.id, item.name, item.httpMethod, item.url, security, signable);
  }
}
