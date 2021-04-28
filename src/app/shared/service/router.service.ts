import {Injectable} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {Constants} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(
    private readonly router: Router,
    private readonly storage: StorageService
  ) {
  }

  saveCurrent() {
    this.storage.store(Constants.STORAGE_KEY_CALLBACK, this.router.url);
  }

  navigateTo(page: string, params?: any) {
    let extras: NavigationExtras = {};
    if(params) {
      extras = {
        queryParams: params
      }
    }
    this.router.navigate([page], extras)
      .then();
  }

  navigateToHome() {
    this.navigateTo(Constants.ROUTE_HOME);
  }

  navigateToSaved() {
    let callback = this.storage.read(Constants.STORAGE_KEY_CALLBACK)
    if (callback) {
      this.navigateTo(callback);
      this.storage.remove(callback);
    }
  }
}
