import {Component, OnInit, TemplateRef} from '@angular/core';
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

  ngOnInit(): void {
    this.context.selectedApplication$
      .pipe(mergeMap(it => this.service.fetchApplicationCallbacks(it)))
      .subscribe(it => this._callbacks$.next(it))
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered modal-w',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  create() {
    this.modalRef.hide();
  }

  selectCallback(callback: Callback) {
    this.context.updateCallback(callback);
  }

  get selectedCallback() {
    return this.context.currentCallback
  }
}
