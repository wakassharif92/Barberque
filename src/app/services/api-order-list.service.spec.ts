import { TestBed } from '@angular/core/testing';

import { ApiOrderListService } from './api-order-list.service';

describe('ApiOrderListService', () => {
  let service: ApiOrderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOrderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
