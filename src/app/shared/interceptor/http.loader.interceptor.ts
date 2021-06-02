import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogService} from "../service/log.service";
import {environment} from "../../../environments/environment";


@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(
    private readonly log: LogService
  ) {
  }

  HTTP_LOADER_IGNORE_LIST = [
    "/subscriptions",
    "/traffic/span",
    "/traffic/trace"
  ]

  /**
   * Interceptor inject token in header Authorization
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<any> {
    if (!req.url.includes(environment.apiUrl)) {
      return next.handle(req)
    }

    if(req.method.toUpperCase() != "GET") {
      return next.handle(req)
    }

    if(this.HTTP_LOADER_IGNORE_LIST.some(it => req.url.startsWith(environment.apiUrl + it))) {
      this.log.debug(`Ignoring http loader: ${req.method.toUpperCase()} ${req.url}`)

      const headersConfig = {
        "hide_loader": "true"
      };
      const request = req.clone({setHeaders: headersConfig});

      return next.handle(request);
    }


    return next.handle(req);
  }
}
