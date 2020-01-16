import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MealFormService } from 'src/app/services/meal-form.service';

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

  constructor(
    private mealFormService: MealFormService
  ) { }

  ngOnInit() {}

}
