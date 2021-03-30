import {Component, OnInit} from '@angular/core';
import {VariableService} from '../variable.service';
import {CallbackResponse} from "../../service/callback.service";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

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

  readonly responseCode$: Observable<number> = this._response$.asObservable()
    .pipe(map(it => it?.responseCode))

  constructor(public variable: VariableService) {
  }

  ngOnInit(): void {
    this.response$
      .subscribe(res => {
        let body = res.responseBody;
        if (res.headers.get("Content-Type")?.startsWith("application/json")) {
          const str = JSON.stringify(body, null, '\t');
          this.outputHtml(this.variable.syntaxHighlight(str));
        } else if (res.headers.get("Content-Type")?.startsWith("text/plain")) {
          this.output(body);
        } else {
          this.output(body);
        }
      })
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
    this._response$.next(response);
  }

  invalidate() {
    // @ts-ignore
    this._response$.next(null);
    this.output("")
  }
}

