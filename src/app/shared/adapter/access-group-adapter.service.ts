import {Injectable} from "@angular/core";
import {BaseAdapter} from "./adapter";
import {AccessGroup} from "../model/access-group";

@Injectable({
  providedIn: 'root'
})
export class AccessGroupAdapter extends BaseAdapter<AccessGroup> {
  adapt(item: any): AccessGroup {
    return new AccessGroup(item.id, item.name, item.description, item.iamGroupName, item.enabled);
  }
}
