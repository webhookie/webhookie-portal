import {Injectable} from '@angular/core';
import {RxAdapter} from "../../../../shared/adapter/adapter";
import {WebhookGroup} from "../../model/webhook-group";
import {AsyncapiParserService} from "../../../../shared/service/asyncapi-parser.service";
import {map, mergeMap, toArray} from "rxjs/operators";
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
      .pipe(map(doc => WebhookGroup.create(item, doc)))
  }

  adaptList(items: any[]): Observable<WebhookGroup[]> {
    return fromArray(items)
      .pipe(mergeMap(it => this.adapt(it)))
      .pipe(toArray())
  }
}
