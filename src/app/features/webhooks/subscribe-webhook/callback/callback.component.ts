import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CallbackService} from "../../service/callback.service";
import {mergeMap} from "rxjs/operators";
import {EMPTY, Observable, of, ReplaySubject, Subject, zip} from "rxjs";
import {Application} from "../../model/application";
import {Callback} from "../../../../shared/model/callback";
import {ModalService} from "../../../../shared/service/modal.service";
import {SubscriptionContext} from "../subscription-context";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../../shared/model/table/column/context-menu-item";
import {CallbackUrlComponent} from "../../callback-test/callback-url/callback-url.component";

type CallbackContextMenu = ContextMenuItem<Callback, CallbackMenu>

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  @ViewChild("editCallbackTemplate") editCallbackTemplate!: TemplateRef<any>;

  readonly _callbacks$: Subject<Array<Callback>> = new ReplaySubject();

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

  get encodedSecret(): string {
    return CallbackUrlComponent.ENCODED_SECRET
  }

  get callbackMenuItems(): Array<CallbackContextMenu> {
    return [
      ContextMenuItemBuilder
        .create<Callback, CallbackMenu>(CallbackMenu.EDIT)
        .handler(this.editCallback())
        .build()
    ]
  }

  editCallback(): (it: Callback, item: CallbackContextMenu) => any {
    return () => {
      this.modalService.open(this.editCallbackTemplate)
    }
  }

  loadCallbacks(application?: Application): Observable<Array<Callback>> {
    if(application) {
      return this.service.fetchApplicationCallbacks(application)
    }

    return EMPTY;
  }

  ngOnInit(): void {
    this.context.selectedApplication$
      .pipe(mergeMap(it => this.service.fetchApplicationCallbacks(it)))
      .subscribe(list => {
        this._callbacks$.next(list);
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
        this._callbacks$.next(it[1]);
        this.selectCallback(it[0]);
      })
  }

  create() {
    this.modalService.hide();
  }

  selectCallback(callback: Callback) {
    this.context.updateCallback(callback);
  }
}

enum CallbackMenu {
  EDIT = "Edit"
}
