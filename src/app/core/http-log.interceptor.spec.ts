import { TestBed } from '@angular/core/testing';

import { HttpLogInterceptor } from './http-log.interceptor';

describe('HttpLogInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpLogInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpLogInterceptor = TestBed.inject(HttpLogInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
