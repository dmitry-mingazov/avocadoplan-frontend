import { FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Day } from '../_interfaces/day.interface';

export class DayForm {
    weekDay = new FormControl();
    week = new FormControl();
    meals = new FormArray([]);
    formBuilder = new FormBuilder();

    constructor(day: Day) {
        if(day == null || day == undefined)
            return;
        this.weekDay.setValue(day.weekDay);
        this.weekDay.setValidators([Validators.required]);

        this.week.setValue(day.week);
        this.week.setValidators([Validators.required]);

        if(day.meals != null && day.meals != undefined){
            day.meals.forEach( meal => {
                this.meals.push(this.formBuilder.group(meal))
            })
        }
    }
}
