import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Meal } from '../_interfaces/meal.interface';

export class MealForm {
    type = new FormControl();
    dishes = new FormArray([]);

    constructor(meal: Meal){
        if(meal == null || meal == undefined)
            return;
        this.type.setValue(meal.type);

        /*
        if(meal.dishes != null && meal.dishes != undefined){
            meal.dishes.forEach( dish => {
                this.dishes.push(this.formBuilder.group(dish));
            })
        }
        */

    }
}
