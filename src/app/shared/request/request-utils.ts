/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Pageable} from "./pageable";
import {Constants} from "../constants";

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
        if((val instanceof Set) && (val.size > 0)) {
          params = params.set(entry[0], Array.from(val).join(","));
        }
      });

    if(pageable.size != Pageable.UN_PAGED_SIZE) {
      params = params.set("size", pageable.size.toString());
      params = params.set("page", pageable.page.toString());
    }

    let sort = pageable.sort;
    if(sort) {
      params = params.set("sort", `${sort.field.name},${sort.order}`);
    }

    return params;
  }

  static hideLoadingHeader(): HttpHeaders {
    return new HttpHeaders(Constants.HEADER_HIDE_LOADING)
  }
}
