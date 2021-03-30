import { Injectable } from '@angular/core';
import {Adapter} from "../../../../shared/adapter/adapter";
import {Application} from "../../model/application";

@Injectable({
  providedIn: 'root'
})
export class ApplicationAdapter implements Adapter<Application>{

  constructor() { }

  adapt(item: any): Application {
    return new Application(item.id, item.name, item.entity, item.consumerIAMGroups, item.description);
  }
}
