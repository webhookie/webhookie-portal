import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {Trace} from "../model/trace";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {GenericTableComponent} from "../../../shared/components/generic-table/generic-table.component";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {Span} from "../model/span";
import {Pageable} from "../../../shared/request/pageable";
import {ProviderService} from "../service/provider.service";
import {filter, map, mergeMap, skip, tap} from "rxjs/operators";
import {Application} from "../../webhooks/model/application";
import {Callback} from "../../../shared/model/callback";
import {ActivatedRoute} from "@angular/router";
import {JsonUtils} from "../../../shared/json-utils";
import {ModalService} from "../../../shared/service/modal.service";
import {SpanService} from "../service/span.service";
import {HttpMessage} from "../model/http-message";
import {SearchableSelectComponent} from "../../../shared/components/searchable-select/searchable-select.component";
import {environment} from "../../../../environments/environment";
import {SpanTable} from "./span-table";
import {TraceSpanContextMenu} from "./trace-span-menu";
import {TraceContextMenu} from "./trace-menu";
import {TraceTable} from "./trace-table";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent extends GenericTable<Trace, Span> implements OnInit {
  @ViewChild("tableComponent") tableComponent!: GenericTableComponent;
  @ViewChild("resultViewer") resultViewer?: TemplateRef<any>;
  @ViewChild("entitiesComponent") entitiesComponent!: SearchableSelectComponent;
  @ViewChild("applicationsComponent") applicationsComponent!: SearchableSelectComponent;
  @ViewChild("callbacksComponent") callbacksComponent!: SearchableSelectComponent;

  debug = environment.debug
  subscriptionFilter: WebhookTrafficFilter = {}

  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();
  readonly tableData: Observable<Array<Trace>> = this._traces$.asObservable();

  readonly spanFilter$: BehaviorSubject<WebhookTrafficFilter> = new BehaviorSubject<WebhookTrafficFilter>({});

  private readonly traceTable!: TraceTable
  private readonly spanTable!: SpanTable

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: ModalService,
    private readonly traceService: TraceService,
    private readonly spanService: SpanService,
    private readonly providerService: ProviderService
  ) {
    super();

    this.activatedRoute.queryParams
      .subscribe(it => this.initialFilters.topic = it.topic);

    this.traceTable = new TraceTable(this.viewTraceRequest);
    this.spanTable = new SpanTable(this.viewSpanRequest, this.viewSpanResponse);
  }

  ngOnInit(): void {
    this.providerService.myEntities()
      .subscribe(it => this.entitiesComponent.values.next(it));

    this.spanFilter$.asObservable()
      .pipe(
        filter(it => it.entity != null),
        mergeMap(it => this.providerService.entityApplications(it.entity!))
      )
      .subscribe(it => this.applicationsComponent.values.next(it));

    this.spanFilter$.asObservable()
      .pipe(
        filter(it => it.application != null),
        mergeMap(it => this.providerService.applicationCallbacks(it.application!))
      )
      .subscribe(it => this.callbacksComponent.values.next(it));

    this.spanFilter$.asObservable()
      .pipe(skip(1))
      .subscribe(it => {
        this._traces$.next([]);
        let filter = Object.assign(this.tableComponent.currentFilter.value, {
          entity: it.entity,
          application: it.application?.id,
          callback: it.callback?.id
        });

        this.tableComponent.currentFilter.next(filter);
      });
  }

  fetchData(filter: any, pageable: Pageable) {
    this.traceService.readTraces(filter, pageable)
      .subscribe(it => this._traces$.next(it));
  }

  get headers(): Array<TableHeader> {
    return this.traceTable.headers
  }

  get filters(): Array<TableFilter> {
    return this.traceTable.filters
  }

  get columns(): Array<TableColumn> {
    return this.traceTable.columns
  }

  viewTraceRequest(): (trace: Trace, item: TraceContextMenu) => any {
    return (trace: Trace) => {
      this.viewRequest(trace.traceId)
    }
  }

  viewRequest(traceId: string) {
    this.traceService.traceRequest(traceId)
      .subscribe(it => this.showBody(it));
  }

  showBody(message: HttpMessage) {
    this.modalService.open(this.resultViewer!);
    JsonUtils.updateElementWithJson(message);
  }

  get detailHeaders(): Array<TableHeader> {
    return this.spanTable.headers
  }

  get detailColumns(): Array<TableColumn> {
    return this.spanTable.columns
  }

  viewSpanRequest(): (span: Span, item: TraceSpanContextMenu) => any {
    return (span: Span) => {
      this.viewRequest(span.traceId)
    }
  }

  viewSpanResponse(): (span: Span, item: TraceSpanContextMenu) => any {
    return (span: Span) => {
      this.spanService.spanResponse(span)
        .subscribe(it => {
          this.showBody(it);
        })
    }
  }

  fetchDetails(data: Trace): Observable<boolean> {
    let filter = {
      entity: this.currentEntity,
      application: this.currentApplication?.id,
      callback: this.currentCallback?.id,
    }
    return this.traceService.readTraceSpans(data.traceId, filter, Pageable.unPaged())
      .pipe(tap(it => data.update(it)))
      .pipe(map(() => true))
  }

  onSelectEntity(entity: string) {
    this.selectEntity(entity);
  }

  onSelectApplication(app: Application) {
    this.selectApplication(app);
  }

  onSelectCallback(item: Callback) {
    this.selectCallback(item)
  }

  selectEntity(entity?: string) {
    let filter = this.spanFilter
    if(filter.entity == entity) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: entity,
    // @ts-ignore
      application: null,
    // @ts-ignore
      callback: null
    }

    this.spanFilter$.next(newFilter)
  }

  selectApplication(application?: Application) {
    let filter = this.spanFilter
    if(filter.application == application) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: filter.entity,
      application: application,
    // @ts-ignore
      callback: null
    }

    this.spanFilter$.next(newFilter)
  }

  selectCallback(callback?: Callback) {
    let filter = this.spanFilter
    if(filter.callback == callback) {
      return;
    }

    let newFilter: WebhookTrafficFilter = {
      entity: filter.entity,
      application: filter.application,
      callback: callback
    }

    this.spanFilter$.next(newFilter)
  }

  get spanFilter(): WebhookTrafficFilter {
    return this.spanFilter$.value;
  }

  get currentEntity(): string | null | undefined {
    return this.spanFilter.entity;
  }

  get currentApplication(): Application | null | undefined {
    return this.spanFilter.application;
  }

  get currentCallback(): Callback | null | undefined {
    return this.spanFilter.callback;
  }

  clearEntity() {
    if(this.applicationsComponent) {
      this.applicationsComponent.values.next([])
    }
    this.clearApplication()
    this.selectEntity(undefined)
  }

  clearApplication() {
    if(this.callbacksComponent) {
      this.callbacksComponent.values.next([])
    }
    this.clearCallback()
    this.selectApplication(undefined)
  }

  clearCallback() {
    this.selectCallback(undefined)
  }
}

interface WebhookTrafficFilter {
  entity?: string;
  application?: Application;
  callback?: Callback;
}

