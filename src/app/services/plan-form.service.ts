import { Injectable, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PlanForm } from '../_models/plan-form';
import { DayForm } from '../_models/day-form';
import { WeekDay } from '../_enums/week-day.enum';

@Injectable({
  providedIn: 'root'
})
export class PlanFormService{
  
  private planForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.formBuilder.group(new PlanForm()))
  // '$' used to indicate an obsevable
  planForm$: Observable<FormGroup> = this.planForm.asObservable();

  private defaultWeek: number;
  private defaultWeekDay: WeekDay;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.defaultWeek = 1;
    this.defaultWeekDay = WeekDay.monday;
   }


  addDay() {
    const currentPlan = this.planForm.getValue();
    const currentDays = currentPlan.get('days') as FormArray;

    // TODO increment defaultWeek and defaultWeekDay
    currentDays.push(
      this.formBuilder.group(
        new DayForm({week: this.defaultWeek, weekDay: this.defaultWeekDay, meals: null})
      )
    );

    this.planForm.next(currentPlan);
  }

  deleteDay(index: number) {
    const currentPlan = this.planForm.getValue();
    const currentDays = currentPlan.get('days') as FormArray;

    currentDays.removeAt(index);
    this.planForm.next(currentPlan);
  }

}
