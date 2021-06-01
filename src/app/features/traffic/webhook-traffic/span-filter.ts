import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, skip} from "rxjs/operators";
import {Application} from "../../webhooks/model/application";
import {Callback} from "../../../shared/model/callback";
import {WebhookTrafficFilter} from "./webhook-traffic-filter";

/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 1/6/21 12:41
 */

export class SpanFilter {
  private readonly _filter$: BehaviorSubject<WebhookTrafficFilter> = new BehaviorSubject<WebhookTrafficFilter>({});
  private readonly filter$: Observable<WebhookTrafficFilter> = this._filter$.asObservable();

  // @ts-ignore
  readonly whenEntitySet$: Observable<string> = this.filter$
    .pipe(
      filter(it => it.entity != undefined),
      map(it => it.entity)
    )

  // @ts-ignore
  readonly whenApplicationSet$: Observable<string> = this.filter$
    .pipe(
      filter(it => it.applicationId != undefined),
      map(it => it.applicationId)
    )

  readonly whenSet$: Observable<WebhookTrafficFilter> = this.filter$
    .pipe(skip(1))

  get current(): WebhookTrafficFilter {
    return this._filter$.value
  }

  next(newFilter: WebhookTrafficFilter) {
    this._filter$.next(newFilter)
  }

  get entity(): string | undefined {
    return this.current.entity
  }

  get applicationId(): string | undefined {
    return this.current.applicationId
  }

  get callbackId(): string | undefined {
    return this.current.callbackId
  }

  selectEntity(entity?: string) {
    if (this.entity == entity) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: entity
    }

    this.next(newFilter)
  }

  selectApplication(application?: Application) {
    if (this.applicationId == application?.id) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: this.entity,
      applicationId: application?.id,
    }

    this.next(newFilter)
  }

  selectCallback(callback?: Callback) {
    if (this.callbackId == callback?.id) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: this.entity,
      applicationId: this.applicationId,
      callbackId: callback?.id
    }

    this.next(newFilter)
  }
}
