import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthDataService } from '../services/user-auth-data.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private userAuthData: UserAuthDataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('HttpAuth - Intercepror');
    const token = this.userAuthData.token;

    if (token) {
      request = request.clone(
        {headers: request.headers.set('Authorization', `Basic ${token}`)}
      )
    }

    return next.handle(request);
  }
}
