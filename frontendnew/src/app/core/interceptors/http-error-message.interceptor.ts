import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpErrorMessageInterceptor implements HttpInterceptor {

  constructor(private toasterService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
              // This is client side error
              errorMsg = `Error: ${error.error.message}`;
          } else {
              // This is server side error
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.toasterService.showToast( {header:'Http request', message: errorMsg, classNames:'bg-danger', delay: 100000});
          return throwError(() => new Error(errorMsg));
      }
      )
    );
  }
}
