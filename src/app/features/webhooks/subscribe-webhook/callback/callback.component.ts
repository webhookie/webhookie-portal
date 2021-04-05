import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import {WebhooksContext} from "../../webhooks-context";
import {CallbackService} from "../../service/callback.service";
import {mergeMap} from "rxjs/operators";
import {ReplaySubject, Subject} from "rxjs";
import {Callback} from "../../model/callback";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  readonly _callbacks$: Subject<Array<Callback>> = new ReplaySubject();

  constructor(
    public variable: VariableService,
    public modalRef: BsModalRef,
    private readonly context: WebhooksContext,
    private readonly service: CallbackService,
    private modalService: BsModalService
  ) {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  get selectedCallback() {
    return this.context.currentCallback
  }

  ngOnInit(): void {
    this.context.selectedApplication$
      .pipe(mergeMap(it => this.service.fetchApplicationCallbacks(it)))
      .subscribe(it => this._callbacks$.next(it))
  }

  create() {
    this.variable.modalRef.hide();
  }

  selectCallback(callback: Callback) {
    this.context.updateCallback(callback);
  }
}
