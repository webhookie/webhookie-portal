import {HttpParams} from "@angular/common/http";
import {TableSort} from "./table-sort";

export class TableFilter {
  static httpParams(filter: any, sort?: TableSort): HttpParams {
    let params = new HttpParams();
    Object.entries(filter)
      .filter(entry => entry[1] != "")
      .forEach(entry => {
        let val = entry[1];
        if(typeof val === 'string') {
          params = params.set(entry[0], val);
        }
        if(Array.isArray(val)) {
          params = params.set(entry[0], val.join(","));
        }
      });

    params = params.set("size", "20");
    params = params.set("page", "0");

    if(sort) {
      params = params.set("sort", `${sort.field.name},${sort.order}`);
    }

    return params;
  }
}
