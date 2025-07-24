import { TestBed } from '@angular/core/testing';

import { DateConvertionService } from './date-convertion-service';

describe('DateConvertionService', () => {
  let service: DateConvertionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateConvertionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
