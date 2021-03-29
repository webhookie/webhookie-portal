import { Injectable } from '@angular/core';
import {Adapter} from "../../../shared/adapter/adapter";
import {Topic, WebhookGroup} from "./webhook-group";

@Injectable({
  providedIn: 'root'
})
export class WebhookGroupAdapter implements Adapter<WebhookGroup>{

  constructor() { }

  adapt(item: any): WebhookGroup {
    let topics = item.topics.map((it: any) => new Topic(it.name, it.description))

    return new WebhookGroup(
      item.id,
      item.title,
      item.webhookVersion,
      item.description,
      item.raw,
      topics
    );
  }
}
