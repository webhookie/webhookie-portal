import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {LogService} from "../service/log.service";
import {environment} from "../../../environments/environment";


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    @Inject("Auth") private authService: AuthService,
    private readonly log: LogService
  ) {
  }

  /**
   * Interceptor inject token in header Authorization
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<any> {
    if (req.url.includes("/public/")) {
      return next.handle(req)
    }
    if (req.url.includes("/manage/health")) {
      return next.handle(req)
    }
    if (!req.url.includes(environment.apiUrl)) {
      return next.handle(req)
    }

    this.log.debug(`Adding token to the request: ${req.url}`)

    const headersConfig = {};
    const token = this.authService.getToken();
    if (token) {
      // @ts-ignore
      headersConfig["Authorization"] = `Bearer ${token}`;
    }
    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request).pipe(
      // @ts-ignore
      catchError(error => {
        switch (error.status) {
          case 401:
            this.log.error(`401 Response from ${req.method} ${req.url}`)
            return observableThrowError('401')
          case 0:
            this.log.error("ERROR!!!")
            return null;
        }
        throw error;
      })
    );
  }

  ignoreRequests: Set<string> = new Set<string>([
    "/public/",
    "/manage/health",
  ]);

}
