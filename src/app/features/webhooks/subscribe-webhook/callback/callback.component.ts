import {Component, OnInit} from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import {WebhooksContext} from "../../webhooks-context";
import {CallbackService} from "../../service/callback.service";
import {mergeMap} from "rxjs/operators";
import {Observable, of, ReplaySubject, Subject, zip} from "rxjs";
import {Application} from "../../model/application";
import {Callback} from "../../../../shared/model/callback";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  readonly _callbacks$: Subject<Array<Callback>> = new ReplaySubject();

  constructor(
    public variable: VariableService,
    private readonly context: WebhooksContext,
    private readonly service: CallbackService
  ) {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  get selectedCallback() {
    return this.context.currentCallback
  }

  loadCallbacks(application: Application): Observable<Array<Callback>> {
    return this.service.fetchApplicationCallbacks(application)
  }

  ngOnInit(): void {
    this.context.selectedApplication$
      .pipe(mergeMap(it => this.service.fetchApplicationCallbacks(it)))
      .subscribe(list => {
        this._callbacks$.next(list);
        if(this.context.currentCallbackId) {
          const callback = list.filter(it => it.callbackId == this.context.currentCallbackId)[0]
          this.selectCallback(callback)
        }
      })

    this.context._createdCallback$.asObservable()
      .pipe(
        mergeMap(it => zip(of(it), this.loadCallbacks(this.selectedApplication)))
      )
      .subscribe(it => {
        this._callbacks$.next(it[1]);
        this.selectCallback(it[0]);
      })
  }

  create() {
    this.variable.modalRef.hide();
  }

  selectCallback(callback: Callback) {
    this.context.updateCallback(callback);
  }
}
