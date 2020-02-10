import { FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Day } from '../_interfaces/day.interface';
import { MealForm } from './meal-form';

const fb = new FormBuilder();

export class DayForm {
    weekDay = new FormControl();
    week = new FormControl();
    meals = new FormArray([]);

    constructor(day?: Day) {
        if(day == null || day == undefined)
            return;
        this.weekDay.setValue(day.weekDay);
        this.weekDay.setValidators([Validators.required]);

        this.week.setValue(day.week);
        this.week.setValidators([Validators.required]);

        if(day.meals != null && day.meals != undefined){
            day.meals.forEach( meal => {
                this.meals.push(fb.group(new MealForm(meal)))
            })
        }
    }
}
