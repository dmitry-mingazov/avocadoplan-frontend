import { TestBed } from '@angular/core/testing';

import { DayFormService } from './day-form.service';

describe('DayFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayFormService = TestBed.get(DayFormService);
    expect(service).toBeTruthy();
  });
});
