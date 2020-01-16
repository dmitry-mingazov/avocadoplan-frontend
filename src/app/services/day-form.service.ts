import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DayForm } from '../_models/day-form';
import { Day } from '../_interfaces/day.interface';
import { MealForm } from '../_models/meal-form';
import { Meal } from '../_interfaces/meal.interface';

@Injectable({
  providedIn: 'root'
})
export class DayFormService {

  private dayForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.formBuilder.group(new DayForm(null)));
  dayForm$: Observable<FormGroup> = this.dayForm.asObservable();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  updateDay(day: FormGroup){
    this.dayForm.next(day);
  }

  addEmptyMeal(){
    this.addMeal(null);
  }

  addMeal(meal: Meal) {
    const currentDay = this.dayForm.getValue();
    const currentMeals = currentDay.get('meals') as FormArray;

    currentMeals.push(
      this.formBuilder.group(new MealForm(meal))
    );

    this.dayForm.next(currentDay);
  }


}
