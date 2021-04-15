import {HttpParams} from "@angular/common/http";
import {Pageable} from "./pageable";

export class RequestUtils {
  static httpParams(filter: any, pageable: Pageable): HttpParams {
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

    params = params.set("size", pageable.size.toString());
    params = params.set("page", pageable.page.toString());

    let sort = pageable.sort;
    if(sort) {
      params = params.set("sort", `${sort.field.name},${sort.order}`);
    }

    return params;
  }
}
