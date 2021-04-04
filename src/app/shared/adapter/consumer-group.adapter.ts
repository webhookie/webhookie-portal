import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {ConsumerGroup} from "../model/consumer-group";

@Injectable({
  providedIn: 'root'
})
export class ConsumerGroupAdapter implements Adapter<ConsumerGroup> {
  adapt(item: any): ConsumerGroup {
    return new ConsumerGroup(item.id, item.name, item.description, item.iamGroupName, item.enabled);
  }
}
