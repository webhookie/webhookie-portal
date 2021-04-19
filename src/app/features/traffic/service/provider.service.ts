import {Inject, Injectable} from '@angular/core';
import {Api} from "../../../shared/api";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(
    @Inject("Api") private readonly api: Api
  ) {
  }

  myEntities(): Observable<Array<string>> {
    return this.api.json("/provider/entities")
  }
}
