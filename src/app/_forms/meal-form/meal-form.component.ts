import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MealFormService } from 'src/app/services/meal-form.service';
import { MealType } from 'src/app/_enums/meal-type.enum';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent implements OnInit {
  @Input() mealForm: FormGroup;
  @Input() index: number;

  private mealFormSub: Subscription;
  private dishes: FormArray;
  private mealTypes = MealType;


  constructor(
    private mealFormService: MealFormService
  ) { }

  ngOnInit() {
    this.mealFormSub = this.mealFormService.mealForm$
      .subscribe( meal => {
        this.mealForm = meal;
        this.dishes = this.mealForm.get('dishes') as FormArray;
      })
  }

  addDish() {
    this.mealFormService.addEmptyDish();
  }

}
