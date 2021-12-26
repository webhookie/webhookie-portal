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

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, timer} from "rxjs";
import {filter, map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {JsonViewerComponent} from "../../../../shared/components/json-viewer/json-viewer.component";
import {CallbackResponse} from "../../../../shared/model/callback/callback-response";
import {Optional} from "../../../../shared/model/optional";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  @Input() preShow: boolean = false
  @ViewChild("responseViewer") responseViewer?: JsonViewerComponent
  // @ts-ignore
  private readonly _response$: BehaviorSubject<CallbackResponse> = new BehaviorSubject<CallbackResponse>(null);

  readonly response$: Observable<CallbackResponse> = this._response$.asObservable()
    .pipe(filter(it => it != null))

  readonly isValid$: Observable<boolean> = this.response$
    .pipe(map(it => (it.responseCode >= 200) && (it.responseCode < 300)))

  // noinspection JSUnusedGlobalSymbols
  readonly responseCode$: Observable<number> = this._response$.asObservable()
    .pipe(map(it => it?.responseCode))

  responseClass: string = "text-default"
  responseStatus: Optional<ResponseStatus> = null;

  get isClear() {
    return this.responseStatus == null;
  }

  get isSuccess() {
    return this.responseStatus == ResponseStatus.SUCCESS;
  }

  get isError() {
    return this.responseStatus == ResponseStatus.ERROR;
  }

  constructor() {
  }

  get hasResponse() {
    return this._response$.value
  }

  ngOnInit(): void {
    this.response$
      .subscribe(res => this.responseViewer?.show(res.responseBody));
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  update(response: CallbackResponse) {
    this.responseStatus = ResponseStatus.SUCCESS
    this.stopTimer();
    this._response$.next(response);
    this.responseClass = "text-success"
  }

  validateTimer$: Subject<number> = new ReplaySubject();
  private timer?: Subscription;

  private startTimer() {
    this.timer = timer(0, 99)
      .subscribe(it => this.validateTimer$.next(it * 99));
  }

  private stopTimer() {
    this.timer?.unsubscribe()
  }

  updateWithError(errorResponse: HttpErrorResponse) {
    this.responseStatus = ResponseStatus.ERROR
    this.stopTimer();
    this.responseClass = "text-danger"
    let body: any;

    try {
      body = JSON.parse(errorResponse.error)
    } catch (e) {
      body = errorResponse.error
    }

    let res = new CallbackResponse(
      errorResponse.status,
      errorResponse.headers,
      body
    )
    this._response$.next(res);
  }

  init() {
    this.preShow = true;
    this.invalidate();
    this.startTimer();
  }

  invalidate() {
    // @ts-ignore
    this._response$.next(null);
    this.responseClass = "text-default"
    this.responseViewer?.clear();
    // @ts-ignore
    this.validateTimer$.next(null);
    this.responseStatus = null;
  }
}

enum ResponseStatus {
  SUCCESS = 1,
  ERROR = -1
}

