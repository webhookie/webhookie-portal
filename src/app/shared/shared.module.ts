import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ApiService} from "./api.service";
import {environment} from "../../environments/environment";
import {MockApiService} from "./mock/mod-api.service";

let apiProvider;
if (environment.mock) {
  console.warn("Using MOCK API!!! make sure to remove this in production")
  apiProvider = MockApiService
} else {
  apiProvider = ApiService
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: 'Api',
      useClass: apiProvider
    }
  ]
})
export class SharedModule {
}
