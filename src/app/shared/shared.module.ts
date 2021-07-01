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
import {ContextMenuComponent} from './components/context-menu/context-menu.component';
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
import {HttpLoaderInterceptor} from "./interceptor/http.loader.interceptor";
import {AuthService} from "./service/auth.service";
import {MockAuthService} from "./mock/mock-auth.service";
import { TableSelectHeaderComponent } from './components/generic-table/table-select-header/table-select-header.component';
import { ArrowRightComponent } from './components/arrow-right/arrow-right.component';

let apiProvider;
let authProvider;
if (environment.mock) {
  console.warn("Using MOCK API!!! make sure to remove this in production")
  apiProvider = MockApiService
  authProvider = MockAuthService
} else {
  apiProvider = ApiService
  authProvider = AuthService
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
    TableSelectHeaderComponent,
    ArrowRightComponent,
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
    SearchableSelectComponent,
    ArrowRightComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true
    },
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
    {
      provide: 'Auth',
      useClass: authProvider
    },
    BsDatepickerConfig
  ]
})
export class SharedModule {
}
