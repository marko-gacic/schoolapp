import { TestBed } from '@angular/core/testing';

import { HttpErrorMessageInterceptor } from './http-error-message.interceptor';

describe('HttpErrorMessageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorMessageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorMessageInterceptor = TestBed.inject(HttpErrorMessageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
