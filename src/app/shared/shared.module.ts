import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';
import {ApiService} from "./api.service";
import {environment} from "../../environments/environment";
import {MockApiService} from "./mock/mock-api.service";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';

import { SortButtonsComponent } from './components/sort-buttons/sort-buttons.component';
let apiProvider;
if (environment.mock) {
  console.warn("Using MOCK API!!! make sure to remove this in production")
  apiProvider = MockApiService
} else {
  apiProvider = ApiService
}

@NgModule({
  declarations: [SpinnerComponent, DatepickerComponent, TimepickerComponent, DateTimePickerComponent, SortButtonsComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot()
  ],
  exports: [
    SpinnerComponent,
    DateTimePickerComponent,
    DatepickerComponent,
    TimepickerComponent,
    SortButtonsComponent,
    CommonModule,
    RouterModule
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
