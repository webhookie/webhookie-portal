import {Injectable} from '@angular/core';
import {RxAdapter} from "../../../../shared/adapter/adapter";
import {WebhookGroup} from "../../model/webhook-group";
import {AsyncapiParserService} from "../../../../shared/service/asyncapi-parser.service";
import {map, mergeMap, toArray} from "rxjs/operators";
import {Webhook} from "../../model/webhook";
import {Observable} from "rxjs";
import {fromArray} from "rxjs/internal/observable/fromArray";

@Injectable({
  providedIn: 'root'
})
export class WebhookGroupAdapter implements RxAdapter<WebhookGroup> {
  constructor(private readonly parser: AsyncapiParserService) {
  }

  adapt(item: any): Observable<WebhookGroup> {
    return this.parser.parse(item.raw)
      .pipe(
        map(it => {
          return it.channelNames()
            .map(name => Webhook.create(item.id, it, name))
        }),
        map(items => {
          return new WebhookGroup(
            item.id,
            item.title,
            item.webhookVersion,
            item.description,
            item.raw,
            items,
            item.consumerAccess,
            item.consumerGroups,
            item.providerAccess,
            item.providerGroups,
          );
        })
      )
  }

  adaptList(items: any[]): Observable<WebhookGroup[]> {
    return fromArray(items)
      .pipe(mergeMap(it => this.adapt(it)))
      .pipe(toArray())
  }
}
