import { TestBed } from '@angular/core/testing';

import { ApiSalonProductService } from './api-salon-product.service';

describe('ApiSalonProductService', () => {
  let service: ApiSalonProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSalonProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
