import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {AuthService} from "../shared/auth.service";
import {LogService} from "../shared/log.service";


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
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
}
