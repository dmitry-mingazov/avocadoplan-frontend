import { TestBed } from '@angular/core/testing';

import { PlanFormService } from './plan-form.service';

describe('CreateFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanFormService = TestBed.get(PlanFormService);
    expect(service).toBeTruthy();
  });
});
