import { TestBed } from '@angular/core/testing';

import { MealFormService } from './meal-form.service';

describe('MealFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealFormService = TestBed.get(MealFormService);
    expect(service).toBeTruthy();
  });
});
