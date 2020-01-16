import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Form, FormArray } from '@angular/forms';
import { MealForm } from '../_models/meal-form';
import { Dish } from '../_interfaces/dish.interface';
import { DishForm } from '../_models/dish-form';

@Injectable({
  providedIn: 'root'
})
export class MealFormService {

  private mealForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.formBuilder.group(new MealForm(null)));
  mealForm$: Observable<FormGroup> = this.mealForm.asObservable();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  updateMeal(meal: FormGroup){
    this.mealForm.next(meal);
  }

  addEmptyDish() {
    this.addDish(null);
  }

  addDish(dish: Dish) {
    const currentMeal = this.mealForm.getValue();
    const currentDishes = currentMeal.get('dishes') as FormArray;

    currentDishes.push(
      this.formBuilder.group(new DishForm(null))
    )

    this.mealForm.next(currentMeal);
  }
}
