import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from "./service/api.service";
import {environment} from "../../environments/environment";
import {MockApiService} from "./mock/mock-api.service";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {TimepickerComponent} from './components/timepicker/timepicker.component';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {DateTimePickerComponent} from './components/date-time-picker/date-time-picker.component';

import {SortButtonsComponent} from './components/sort-buttons/sort-buttons.component';
import {SearchListComponent} from './components/search-list/search-list.component';
import {GenericTableComponent} from "./components/generic-table/generic-table.component";
import {TimestampFilterComponent} from './components/timestamp-filter/timestamp-filter.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ContextMenuComponent} from './components/generic-table/table-menu/context-menu.component';
import {JsonViewerComponent} from './components/json-viewer/json-viewer.component';
import {MultiSelectComponent} from './components/multi-select/multi-select.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpTokenInterceptor} from "./interceptor/http.token.interceptor";
import {HttpLogInterceptor} from "./interceptor/http-log.interceptor";
import {HttpErrorInterceptor} from "./interceptor/http-error.interceptor";
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';
import {NgbAlertModule, NgbToastModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import { SearchableSelectComponent } from './components/searchable-select/searchable-select.component';

let apiProvider;
if (environment.mock) {
  console.warn("Using MOCK API!!! make sure to remove this in production")
  apiProvider = MockApiService
} else {
  apiProvider = ApiService
}

@NgModule({
  declarations: [
    ContextMenuComponent,
    GenericTableComponent,
    SpinnerComponent,
    DatepickerComponent,
    TimepickerComponent,
    DateTimePickerComponent,
    SortButtonsComponent,
    SearchListComponent,
    TimestampFilterComponent,
    JsonViewerComponent,
    ConfirmDialogComponent,
    MultiSelectComponent,
    ToastsContainerComponent,
    SearchableSelectComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgbToastModule,
    NgbAlertModule,
    NgbTypeaheadModule
  ],
  exports: [
    GenericTableComponent,
    SpinnerComponent,
    DateTimePickerComponent,
    DatepickerComponent,
    TimepickerComponent,
    SortButtonsComponent,
    CommonModule,
    RouterModule,
    SearchListComponent,
    ContextMenuComponent,
    JsonViewerComponent,
    ConfirmDialogComponent,
    MultiSelectComponent,
    ToastsContainerComponent,
    SearchableSelectComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLogInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: 'Api',
      useClass: apiProvider
    },
    BsDatepickerConfig
  ]
})
export class SharedModule {
}
