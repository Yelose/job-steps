import { TestBed } from '@angular/core/testing';

import { OfferFormConfigService } from './offer-form-config-service';

describe('OfferFormConfig', () => {
  let service: OfferFormConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferFormConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
