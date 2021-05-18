import {Injectable} from '@angular/core';
import {BaseAdapter} from "../../../../shared/adapter/adapter";
import {Application} from "../../model/application";

@Injectable({
  providedIn: 'root'
})
export class ApplicationAdapter extends BaseAdapter<Application> {
  adapt(item: any): Application {
    return new Application(item.id, item.name, item.entity, item.consumerIAMGroups, item.description);
  }
}
