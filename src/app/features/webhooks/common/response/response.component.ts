import {Component, OnInit} from '@angular/core';
import {CallbackResponse} from "../../service/callback.service";
import {BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, timer} from "rxjs";
import {filter, map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {JsonUtils} from "../../../../shared/json-utils";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
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

  constructor() {
  }

  get hasResponse() {
    return this._response$.value
  }

  ngOnInit(): void {
    this.response$
      .subscribe(res => {
        let body = res.responseBody;
        if (res.headers.get("Content-Type")?.startsWith("application/json")) {
          const str = JSON.stringify(body, null, '\t');
          this.outputHtml(JsonUtils.syntaxHighlight(str));
        } else if (res.headers.get("Content-Type")?.startsWith("text/plain")) {
          this.output(body);
        } else {
          this.output(body);
        }
      })
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  outputHtml(body: any) {
    let myContainer = document.getElementById('test_res') as HTMLInputElement;
    myContainer.innerHTML = body;
  }

  output(body: any) {
    let myContainer = document.getElementById('test_res') as HTMLInputElement;
    myContainer.innerText = body;
  }

  update(response: CallbackResponse) {
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
    this.invalidate();
    this.startTimer();
  }

  invalidate() {
    // @ts-ignore
    this._response$.next(null);
    this.responseClass = "text-default"
    this.output("")
    // @ts-ignore
    this.validateTimer$.next(null);
  }
}

