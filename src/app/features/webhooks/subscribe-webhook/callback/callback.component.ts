import {Component, OnInit, ViewChild} from '@angular/core';
import {CallbackService} from "../../service/callback.service";
import {mergeMap} from "rxjs/operators";
import {EMPTY, Observable, of, zip} from "rxjs";
import {Application} from "../../model/application";
import {Callback} from "../../../../shared/model/callback";
import {ModalService} from "../../../../shared/service/modal.service";
import {SubscriptionContext} from "../subscription-context";
import {SearchableSelectComponent} from "../../../../shared/components/searchable-select/searchable-select.component";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  @ViewChild("callbacksComponent", { static: true}) callbacksComponent!: SearchableSelectComponent

  constructor(
    readonly modalService: ModalService,
    private readonly context: SubscriptionContext,
    private readonly service: CallbackService
  ) {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  get selectedCallback() {
    return this.context.currentCallback
  }

  loadCallbacks(application?: Application): Observable<Array<Callback>> {
    if(application) {
      return this.service.fetchApplicationCallbacks(application)
    }

    return EMPTY;
  }

  ngOnInit(): void {
    this.context.applicationCleared$
      .subscribe(() => this.callbacksComponent.clear())

    this.context.selectedApplication$
      .pipe(mergeMap(it => this.service.fetchApplicationCallbacks(it)))
      .subscribe(list => {
        this.callbacksComponent.values.next(list);
        this.callbacksComponent.clear();
        if(this.context.currentCallbackId) {
          const callback = list.filter(it => it.id == this.context.currentCallbackId)[0]
          this.selectCallback(callback)
        }
      })

    this.context._createdCallback$.asObservable()
      .pipe(
        mergeMap(it => zip(of(it), this.loadCallbacks(this.selectedApplication)))
      )
      .subscribe(it => {
        this.callbacksComponent.values.next(it[1]);
        this.selectCallback(it[0]);
      })
  }

  create() {
    this.modalService.hide();
  }

  selectCallback(callback?: Callback) {
    this.context.updateCallback(callback);
  }

  clearCallback() {
    this.selectCallback(undefined)
  }
}
