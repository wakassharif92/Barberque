import { TestBed } from '@angular/core/testing';

import { PlaceOrderApiService } from './place-order-api.service';

describe('PlaceOrderApiService', () => {
  let service: PlaceOrderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceOrderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
