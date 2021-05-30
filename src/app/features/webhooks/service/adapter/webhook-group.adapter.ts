import {Injectable} from '@angular/core';
import {RxAdapter} from "../../../../shared/adapter/adapter";
import {Topic, WebhookGroup} from "../../model/webhook-group";
import {AsyncapiParserService} from "../../../../shared/service/asyncapi-parser.service";
import {map, mergeMap, toArray} from "rxjs/operators";
import {Observable} from "rxjs";
import {fromArray} from "rxjs/internal/observable/fromArray";
import {Webhook} from "../../model/webhook";
import {WebhookType} from "../../model/webhook-type";

@Injectable({
  providedIn: 'root'
})
export class WebhookGroupAdapter implements RxAdapter<WebhookGroup> {
  constructor(private readonly parser: AsyncapiParserService) {
  }

  adapt(item: any): Observable<WebhookGroup> {
    return this.parser.parse(item.raw)
      .pipe(map(doc => {
        let webhooks = item.webhooks
          .map((webhook: any) => {
            let name = webhook.topic.name;
            let channel = doc.channel(name);
            let type = channel.hasSubscribe() ? WebhookType.SUBSCRIBE : WebhookType.PUBLISH;
            let topic = new Topic(name, webhook.topic.description);

            return new Webhook(item.id, topic, webhook.numberOfSubscriptions, type, channel, doc.defaultContentType())
          })
        return WebhookGroup.create(item, webhooks, doc)
      }))
  }

  adaptList(items: any[]): Observable<WebhookGroup[]> {
    return fromArray(items)
      .pipe(mergeMap(it => this.adapt(it)))
      .pipe(toArray())
  }
}
