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

import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TraceService} from "../service/trace.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Trace, TraceStatus} from "../model/trace";
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
import {SpanTable} from "./span-table";
import {TraceTable} from "./trace-table";
import {SpanFilter} from "./span-filter";
import {WebhookTrafficFilter} from "./webhook-traffic-filter";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent extends GenericTable<Trace, Span> implements OnInit, AfterViewInit {
  @ViewChild("tableComponent") tableComponent!: GenericTableComponent;
  @ViewChild("resultViewer") resultViewer?: TemplateRef<any>;
  @ViewChild("entitiesComponent") entitiesComponent!: SearchableSelectComponent;
  @ViewChild("applicationsComponent") applicationsComponent!: SearchableSelectComponent;
  @ViewChild("callbacksComponent") callbacksComponent!: SearchableSelectComponent;

  debug = environment.debug

  private readonly _traces$: Subject<Array<Trace>> = new ReplaySubject();
  readonly tableData: Observable<Array<Trace>> = this._traces$.asObservable();

  spanFilter!: SpanFilter;
  aggregatedQueryingFilter = {};

  private readonly traceTable!: TraceTable
  private readonly spanTable!: SpanTable

  viewTraceRequest = (trace: Trace) => {
    this.traceService.traceRequest(trace.traceId)
      .subscribe(it => this.showBody(it));
  }

  viewSpanRequest = (span: Span) => {
    this.spanService.spanRequest(span.spanId)
      .subscribe(it => this.showBody(it));
  }

  viewSpanResponse = (span: Span) => {
    this.spanService.spanResponse(span)
      .subscribe(it => {
        this.showBody(it);
      })
  }

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
        this.initialFilters.subscriptionId = it.subscriptionId;
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

  }

  combineFilters(tableFilter: any, pageFilter: WebhookTrafficFilter): any {
    return Object.assign({}, tableFilter, pageFilter);
  }

  ngAfterViewInit(): void {
    this.spanFilter.whenSet$
      .subscribe(it => {
        this._traces$.next([]);
        let filter = this.combineFilters(this.tableComponent.currentFilter.value, it);
        this.tableComponent.currentFilter.next(filter);
      });
  }

  fetchData(filter: any, pageable: Pageable) {
    this.aggregatedQueryingFilter = this.combineFilters(filter, this.spanFilter.current);

    this.traceService.readTraces(this.aggregatedQueryingFilter, pageable)
      .subscribe(it => this._traces$.next(it));
  }

  readTotalNumberOfRows(filter: any): Observable<number> {
    let f =  this.combineFilters(filter, this.spanFilter.current);

    return this.traceService.totalNumberOfTraces(f)
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

  fetchDetails(data: Trace): Observable<boolean> {
    let filter = {
      entity: this.spanFilter.entity,
      application: this.spanFilter.applicationId,
      callback: this.spanFilter.callbackId,
      subscriptionId: this.spanFilter.subscriptionId,
    }
    return this.traceService.readTraceSpans(data.traceId, filter, Pageable.unPaged())
      .pipe(tap(it => data.update(it)))
      .pipe(map(() => true))
  }

  hasDetails(data: Trace): boolean {
    return data.statusUpdate.status != TraceStatus.NO_SUBSCRIPTION;
  }

  clearEntity() {
    this.applicationsComponent.values.next([])
    this.spanFilter.clearEntity()
    this.clearApplication()
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

