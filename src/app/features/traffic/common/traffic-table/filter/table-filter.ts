import {HttpParams} from "@angular/common/http";

export abstract class TableFilter {
  enrichHttpParams(params: HttpParams): HttpParams {
    Object.entries(this)
      .filter(entry => entry[1] != "")
      .forEach(entry => {
        console.warn(entry);
        params = params.set(entry[0], entry[1]);
      })

    return params;
  }
}
