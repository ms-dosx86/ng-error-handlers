import { TestBed } from '@angular/core/testing';

import { NgErrorHandlersService } from './ng-error-handlers.service';

describe('NgErrorHandlersService', () => {
  let service: NgErrorHandlersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgErrorHandlersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
