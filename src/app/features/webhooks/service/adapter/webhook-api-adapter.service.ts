/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {Injectable} from '@angular/core';
import {RxAdapter} from "../../../../shared/adapter/adapter";
import {Topic, WebhookApi} from "../../model/webhook-api";
import {AsyncapiParserService} from "../../../../shared/service/asyncapi-parser.service";
import {map, mergeMap, toArray} from "rxjs/operators";
import {Observable} from "rxjs";
import {fromArray} from "rxjs/internal/observable/fromArray";
import {Webhook} from "../../model/webhook";
import {WebhookType} from "../../model/webhook-type";

@Injectable({
  providedIn: 'root'
})
export class WebhookApiAdapter implements RxAdapter<WebhookApi> {
  constructor(private readonly parser: AsyncapiParserService) {
  }

  adapt(item: any): Observable<WebhookApi> {
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
        return WebhookApi.create(item, webhooks, doc)
      }))
  }

  adaptList(items: any[]): Observable<WebhookApi[]> {
    return fromArray(items)
      .pipe(mergeMap(it => this.adapt(it)))
      .pipe(toArray())
  }
}
