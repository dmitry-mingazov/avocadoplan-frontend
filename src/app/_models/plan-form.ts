import { FormControl, FormArray } from '@angular/forms';

export class PlanForm {
    title = new FormControl();
    description = new FormControl();
    drinkDescription = new FormControl();
    owner = new FormControl();
    tags = new FormArray([]);
    days = new FormArray([]);

    constructor(){

    }
}
