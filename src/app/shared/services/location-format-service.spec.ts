import { TestBed } from '@angular/core/testing';

import { LocationFormatService } from './location-format-service';

describe('LocationFormatService', () => {
  let service: LocationFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
