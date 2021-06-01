import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Trace} from "../model/trace";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {GenericTableComponent} from "../../../shared/components/generic-table/generic-table.component";
import {TableColumn} from "../../../shared/model/table/column/table-column";
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {Span} from "../model/span";
import {Pageable} from "../../../shared/request/pageable";
import {ProviderService} from "../service/provider.service";
import {map, mergeMap, tap} from "rxjs/operators";
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
import {SpanFilter} from "./span-filter";

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

  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();
  readonly tableData: Observable<Array<Trace>> = this._traces$.asObservable();

  spanFilter!: SpanFilter;

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
      .subscribe(it => {
        this.initialFilters.topic = it.topic;
        this.spanFilter = new SpanFilter(it);
      });

    this.traceTable = new TraceTable(this.viewTraceRequest);
    this.spanTable = new SpanTable(this.viewSpanRequest, this.viewSpanResponse);
  }

  ngOnInit(): void {
    this.providerService.myEntities()
      .subscribe(it => {
        this.entitiesComponent.values.next(it)
        if(this.spanFilter.initialFilter.entity) {
          this.entitiesComponent.init(this.spanFilter.initialFilter.entity)
        }
      });

    this.spanFilter.whenEntitySet$
      .pipe(mergeMap(it => this.providerService.entityApplications(it)))
      .subscribe(apps => {
        this.applicationsComponent.values.next(apps);
        if(this.spanFilter.initialFilter.applicationId) {
          let app = apps.filter(it => it.id == this.spanFilter.initialFilter.applicationId)[0]
          this.applicationsComponent.init(app);
        }
      });

    this.spanFilter.whenApplicationSet$
      .pipe(mergeMap(it => this.providerService.applicationCallbacks(it)))
      .subscribe(callbacks => {
        this.callbacksComponent.values.next(callbacks)
        if(this.spanFilter.initialFilter.callbackId) {
          let callback = callbacks.filter(it => it.id == this.spanFilter.initialFilter.callbackId)[0]
          this.callbacksComponent.init(callback);
        }

        this.spanFilter.clear();
      });

    this.spanFilter.whenSet$
      .subscribe(it => {
        this._traces$.next([]);
        let filter = Object.assign(this.tableComponent.currentFilter.value, {
          entity: it.entity,
          application: it.applicationId,
          callback: it.callbackId
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
      entity: this.spanFilter.entity,
      application: this.spanFilter.applicationId,
      callback: this.spanFilter.callbackId,
    }
    return this.traceService.readTraceSpans(data.traceId, filter, Pageable.unPaged())
      .pipe(tap(it => data.update(it)))
      .pipe(map(() => true))
  }

  clearEntity() {
    this.applicationsComponent.values.next([])
    this.clearApplication()
    this.spanFilter.clearEntity()
    this.applicationsComponent.clear();
  }

  clearApplication() {
    this.spanFilter.clearApplication()
    this.callbacksComponent.clear();
    this.callbacksComponent.values.next([])
    this.clearCallback()
  }

  clearCallback() {
    this.spanFilter.clearCallback();
  }
}

