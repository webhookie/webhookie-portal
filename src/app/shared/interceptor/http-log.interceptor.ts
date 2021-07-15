import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogService} from "../service/log.service";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable()
export class HttpLogInterceptor implements HttpInterceptor {

  constructor(
    private readonly log: LogService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes(environment.apiUrl)) {
      return next.handle(request);
    }

    if(request.url.includes("/manage/health")) {
      return next.handle(request);
    }

    this.log.info(`${request.method} ${request.url} ${request.params.toString()}`);
    if(!environment.production) {
      let body = request.body;
      if(body) {
        let strBody = (request.headers.get("Content-Type")?.includes("application/json"))
          ? JSON.stringify(body)
          : body;
        this.log.debug(`${strBody}`);
      }
    }

    return next.handle(request)
      .pipe(tap(it => {
        if(!environment.production && it.type == HttpEventType.Response) {
          this.log.debug(it);
        }
      }))
  }
}
