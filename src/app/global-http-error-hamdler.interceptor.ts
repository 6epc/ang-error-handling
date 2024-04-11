import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHamdlerInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (_, retryCount: number) => {
          console.log(retryCount+' попытка через ' + retryCount * 1000 + ' мс');
          return timer(retryCount * 1000);
        }, //1s, 2s, 3s, error
      }),
      catchError(error => {
        console.log('Error handled by HTTP interceptor');
        return throwError(() => {
          console.log('Error rethrown by HTTP Interceptor');
          return error
        })
      })
    );
  }
}
