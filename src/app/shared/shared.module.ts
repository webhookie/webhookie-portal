import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from "./api.service";
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
import { TimestampFilterComponent } from './components/timestamp-filter/timestamp-filter.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { ContextMenuTableColumnComponent } from './components/generic-table/table-menu/context-menu-table-column.component';

let apiProvider;
if (environment.mock) {
  console.warn("Using MOCK API!!! make sure to remove this in production")
  apiProvider = MockApiService
} else {
  apiProvider = ApiService
}

@NgModule({
  declarations: [
    ContextMenuTableColumnComponent,
    GenericTableComponent,
    SpinnerComponent,
    DatepickerComponent,
    TimepickerComponent,
    DateTimePickerComponent,
    SortButtonsComponent,
    SearchListComponent,
    TimestampFilterComponent,
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
        InfiniteScrollModule
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
    SearchListComponent
  ],
  providers: [
    {
      provide: 'Api',
      useClass: apiProvider
    },
    BsDatepickerConfig
  ]
})
export class SharedModule {
}
